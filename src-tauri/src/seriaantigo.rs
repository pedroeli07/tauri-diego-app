// src/serial_wrapper.rs

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
use chrono::Local; // Crate para lidar com data/hora locais.
use std::path::PathBuf; // Struct for handling filesystem paths.

// Struct for binary payload data to be sent to the frontend.
#[derive(Clone, serde::Serialize)]
struct BinaryPayload {
    data: Vec<u8>,
}

// Struct for simple message payloads.
#[derive(Clone, serde::Serialize)]
struct MessagePayload {
    message: String,
}

// Function to list available serial ports and return them as a vector of strings.
pub fn list_ports(app: tauri::AppHandle) -> Vec<String> {
    println!("[{}] [INFO] Listing available ports...", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
    match serialport::available_ports() {
        Ok(ports) => {
            let port_list: Vec<String> = ports.iter().map(|p| p.port_name.clone()).collect();
            println!("[{}] [INFO] Ports found: {:?}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"), port_list);
            port_list
        }
        Err(e) => {
            println!("[{}] [ERROR] Error listing ports: {}", chrono::Local::now().format("%Y-%m-%d %H:%M:%S"), e);
            vec![]
        }
    }
}


// Function to initialize a serial port with the given path and baud rate.
pub fn init_port(port_path: String, baud_rate: u32) -> Result<Box<dyn SerialPort>> {
    println!("Opening port: {}, baud: {}", port_path, baud_rate); 
    let port = serialport::new(port_path, baud_rate)
        .timeout(Duration::from_millis(10))
        .open()?;
    Ok(port)
}

// Function to start a thread that continuously reads from the serial port.
pub fn start_clone_thread(
    app: tauri::AppHandle,
    mut port_clone: Box<dyn SerialPort>,
    is_thread_open: Arc<AtomicBool>,
) {
    let mut serial_buf: Vec<u8> = vec![0; 32];

    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed);
        println!("Thread spawned");
        while is_thread_open.load(Ordering::Relaxed) {
            match port_clone.read(serial_buf.as_mut_slice()) {
                Ok(size) => {
                    let bytes_read = &serial_buf[..size];
                    println!("Received: {:?}", bytes_read);
                    app.emit_all("updateSerial", BinaryPayload { data: bytes_read.to_vec() }).unwrap();
                }
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                Err(_) => {
                    let app_clone = app.clone();
                    use crate::AppData;
                    let state = app_clone.state::<AppData>();
                    let mut state_guard = state.0.lock().unwrap();
                    state_guard.port = None;
                    state_guard.is_recording = false;
                    is_thread_open.store(false, Ordering::Relaxed);
                    app.emit_all("isConnected", MessagePayload {message: "disconnected".to_string()}).unwrap();
                }
            }
        }
        println!("Terminating no record thread and now enabling...");
        is_thread_open.store(true, Ordering::Relaxed);
    });
}

// Function to start a thread that records serial data to a file.
pub fn start_record_on_port(
    app: tauri::AppHandle,
    mut port_clone: Box<dyn SerialPort>,
    is_thread_open: Arc<AtomicBool>,
    mut file: Option<File>,
    path: PathBuf,
) {
    let mut serial_buf: Vec<u8> = vec![0; 32];
    let mut start_time = SystemTime::now();

    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed);
        println!("Record thread spawned");

        while is_thread_open.load(Ordering::Relaxed) {
            match port_clone.read(serial_buf.as_mut_slice()) {
                Ok(size) => {
                    let bytes_read = &serial_buf[..size];
                    println!("Received from record: {:?}", bytes_read);

                    if let Some(ref mut file) = file {
                        // Escrever diretamente bytes binários no arquivo
                        file.write_all(bytes_read).expect("Could not write to file");
                    }

                    app.emit_all("updateSerial", BinaryPayload { data: bytes_read.to_vec() }).unwrap();
                }
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                Err(_) => {
                    let app_clone = app.clone();
                    use crate::AppData;
                    let state = app_clone.state::<AppData>();
                    let mut state_guard = state.0.lock().unwrap();
                    state_guard.port = None;
                    state_guard.is_recording = false;
                    is_thread_open.store(false, Ordering::Relaxed);
                    app.emit_all("isConnected", MessagePayload {message: "disconnected".to_string()}).unwrap();
                    app.emit_all("isRecording", MessagePayload {message: "not recording".to_string()}).unwrap();
                }
            }

            // Rotate the recording file every 10 minutes.
            if start_time.elapsed().unwrap() >= Duration::from_secs(600) {
                if let Some(old_file) = file.take() {
                    drop(old_file);
                }

                let formatted_date_time = Local::now().format("%Y-%m-%d_%H.%M.%S").to_string();
                let file_name = format!("DCubedISM{}.txt", formatted_date_time);
                let file_path = path.join(&file_name);

                match File::create(&file_path) {
                    Ok(new_file) => {
                        file = Some(new_file);
                        start_time = SystemTime::now();
                    }
                    Err(_) => {
                        let app_clone = app.clone();
                        use crate::AppData;
                        let state = app_clone.state::<AppData>();
                        let mut state_guard = state.0.lock().unwrap();
                        state_guard.port = None;
                        state_guard.is_recording = false;
                        is_thread_open.store(false, Ordering::Relaxed);
                        app.emit_all("isConnected", MessagePayload {message: "disconnected".to_string()}).unwrap();
                        app.emit_all("isRecording", MessagePayload {message: "not recording".to_string()}).unwrap();
                    }
                }
            }
        }

        println!("Terminating record thread and now enabling...");
        is_thread_open.store(true, Ordering::Relaxed);
    });
}

/*
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
*/