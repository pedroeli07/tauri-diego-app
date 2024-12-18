// Importing necessary crates and modules.
use serialport::*; // Serial port operations.
use std::io::Write; // Trait for writing to streams.
use std::sync::{
    atomic::{AtomicBool, Ordering}, // AtomicBool for thread-safe boolean flags.
    Arc, // Arc for shared ownership across threads.
};
use std::time::Duration; // Struct for handling time durations.
use std::{io, thread}; // IO and threading modules.
use tauri::Manager; // Tauri Manager for emitting events.
use std::fs::File; // Struct for file operations.
use std::time::SystemTime; // Struct for handling system time.
use chrono::{Local}; // Crate for date and time handling.
use std::path::PathBuf; // Struct for handling filesystem paths.

// Struct for payload data to be sent to the frontend.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String, // The message content.
}

// Function to list available serial ports and return them as a vector of strings.
pub fn list_ports() -> Vec<String> {
    // Retrieve available serial ports using the serialport crate.
    let ports = serialport::available_ports().expect("No ports found!");
    // Map each port to its port name and collect them into a vector.
    let port_list: Vec<String> = ports.iter().map(|p| p.port_name.clone()).collect();
    // Return the list of port names.
    return port_list;
}

// Function to initialize a serial port with the given path and baud rate.
pub fn init_port(port_path: String, baud_rate: u32) -> Result<Box<dyn SerialPort>> {
    println!("Opening port: {}, baud: {}", port_path, baud_rate); // Log the port opening.
    // Attempt to open the serial port with the specified path and baud rate.
    let port = serialport::new(port_path, baud_rate)
        .timeout(Duration::from_millis(10)) // Set a read timeout.
        .open()?; // Open the port, returning an error if it fails.

    // Return the opened port.
    return Ok(port);
}

// Function to start a thread that continuously reads from the serial port.
pub fn start_clone_thread(
    app: tauri::AppHandle, // Handle to the Tauri application.
    mut port_clone: Box<dyn SerialPort>, // Clone of the serial port to be used in the thread.
    is_thread_open: Arc<AtomicBool>, // Shared flag to control the thread's execution.
) {
    // Buffer to store incoming serial data.
    let mut serial_buf: Vec<u8> = vec![0; 32];

    // Spawn a new thread for reading serial data.
    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed); // Indicate that the thread is running.
        println!("Thread spawned"); // Log the thread start.
        while is_thread_open.load(Ordering::Relaxed) { // Loop while the thread is active.
            match port_clone.read(serial_buf.as_mut_slice()) { // Attempt to read from the serial port.
                Ok(size) => {
                    // Convert the read bytes to a UTF-8 string.
                    let data_str = String::from_utf8_lossy(&serial_buf[..size]).to_string();
                    println!("Received: {}", data_str); // Log the received data.
                    // Emit the received data to the frontend via Tauri events.
                    app.emit_all("updateSerial", Payload { message: data_str }).unwrap();
                }
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (), // Ignore timeout errors.
                Err(_) => {
                    // On other errors, perform cleanup.
                    let app_clone = app.clone(); // Clone the app handle.
                    use crate::AppData; // Import AppData from the main module.
                    let state = app_clone.state::<AppData>(); // Retrieve the application state.
                    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
                    // Clone the port path and baud rate for logging or further actions.
                    let _port_path = state_guard.port_items.port_path.clone();
                    let _baud_rate = state_guard.port_items.baud_rate.clone();
                    
                    // Remove the serial port from the state.
                    state_guard.port = None;

                    // Reset the recording flag.
                    state_guard.is_recording = false;
                    // Indicate that the thread is no longer open.
                    is_thread_open.store(false, Ordering::Relaxed);
                    // Emit a disconnected event to the frontend.
                    app.emit_all("isConnected", Payload {message: "disconnected".to_string()}).unwrap();
                }
            }
        }
        println!("Terminating no record thread and now enabling..."); // Log the thread termination.
        is_thread_open.store(true, Ordering::Relaxed); // Reset the thread flag.
    });
}

// Function to start a thread that records serial data to a file.
pub fn start_record_on_port(
    app: tauri::AppHandle, // Handle to the Tauri application.
    mut port_clone: Box<dyn SerialPort>, // Clone of the serial port to be used in the thread.
    is_thread_open: Arc<AtomicBool>, // Shared flag to control the thread's execution.
    mut file: Option<File>, // Optional file handle for recording.
    path: PathBuf, // Path to the recording folder.
) {
    let mut serial_buf: Vec<u8> = vec![0; 32]; // Buffer to store incoming serial data.
    let mut start_time = SystemTime::now(); // Record the start time for file rotation.

    // Spawn a new thread for recording serial data.
    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed); // Indicate that the thread is running.
        println!("Record thread spawned"); // Log the thread start.

        while is_thread_open.load(Ordering::Relaxed) { // Loop while the thread is active.
            match port_clone.read(serial_buf.as_mut_slice()) { // Attempt to read from the serial port.
                Ok(size) => {
                    // Convert the read bytes to a UTF-8 string.
                    let data_str = String::from_utf8_lossy(&serial_buf[..size]).to_string();
                    println!("Received from record {}", data_str); // Log the received data.

                    if let Some(ref mut file) = file {
                        // Write the received data to the file.
                        file.write_all(data_str.as_bytes()).expect("Could not write to file");
                    }

                    // Emit the received data to the frontend via Tauri events.
                    app.emit_all("updateSerial", Payload { message: data_str })
                        .unwrap();
                }
                // Handle timeout errors by doing nothing.
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                Err(_) => {
                    // On other errors, perform cleanup.
                    let app_clone = app.clone(); // Clone the app handle.
                    use crate::AppData; // Import AppData from the main module.
                    let state = app_clone.state::<AppData>(); // Retrieve the application state.
                    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
                    // Remove the serial port from the state.
                    state_guard.port = None;
                    // Reset the recording flag.
                    state_guard.is_recording = false;
                    // Indicate that the thread is no longer open.
                    is_thread_open.store(false, Ordering::Relaxed);
                    // Emit disconnected and not recording events to the frontend.
                    app.emit_all("isConnected", Payload {message: "disconnected".to_string()}).unwrap();
                    app.emit_all("isRecording", Payload {message: "not recording".to_string()}).unwrap();
                }
            }

            // Rotate the recording file every 10 minutes.
            if start_time.elapsed().unwrap() >= Duration::from_secs(600) {
                // Close the current file if it exists.
                if let Some(old_file) = file.take() {
                    drop(old_file);
                }

                // Generate a new filename with the current date and time.
                let formatted_date_time = Local::now().format("%Y-%m-%d_%H.%M.%S").to_string();
                let file_name = format!("SerialWizard_{}.txt", formatted_date_time);
                let file_path = path.join(&file_name);

                // Attempt to create the new file.
                match File::create(&file_path) {
                    Ok(new_file) => {
                        file = Some(new_file); // Update the file handle.
                        start_time = SystemTime::now(); // Reset the timer.
                    }
                    Err(_) => {
                        // On failure to create a new file, perform cleanup.
                        let app_clone = app.clone(); // Clone the app handle.
                        use crate::AppData; // Import AppData from the main module.
                        let state = app_clone.state::<AppData>(); // Retrieve the application state.
                        let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
                        state_guard.port = None; // Remove the serial port from the state.
                        state_guard.is_recording = false; // Reset the recording flag.
                        is_thread_open.store(false, Ordering::Relaxed); // Indicate that the thread is no longer open.
                        // Emit disconnected and not recording events to the frontend.
                        app.emit_all("isConnected", Payload {message: "disconnected".to_string()}).unwrap();
                        app.emit_all("isRecording", Payload {message: "not recording".to_string()}).unwrap();
                    }
                }
            }
        }

        println!("Terminating record thread and now enabling..."); // Log the thread termination.
        is_thread_open.store(true, Ordering::Relaxed); // Reset the thread flag.
    });
}

// Function to write data to the serial port.
pub fn write_serial<'a>(port: &'a mut Box<dyn SerialPort>, input: &'a str) -> Result<usize> {
    // Convert the input string to a String object.
    let newinput = String::from(input);
    // Optionally, append a newline character to the input.
    // newinput.push_str("\n");

    // Convert the input string to bytes.
    let output = newinput.as_bytes();

    // Attempt to write the bytes to the serial port.
    port.write(output)?;

    // Return the number of bytes written.
    return Ok(output.len());
}
