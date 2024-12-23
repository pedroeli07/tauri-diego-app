// Prevents an additional console window on Windows in release builds.
// DO NOT REMOVE!! This is essential for Tauri's window management on Windows.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Importing the `serial_wrapper` module which contains serial port handling functions.
mod serial_wrapper;
use crate::serial_wrapper::backend_log; // if both files are in the same crate

// Importing necessary crates and modules.
use serialport::SerialPort; // Trait for serial port operations.
use std::path::PathBuf; // Struct for handling filesystem paths.
use std::sync::Mutex; // Mutex for thread-safe data access.
use std::sync::{
    atomic::{AtomicBool, Ordering}, // AtomicBool for thread-safe boolean flags.
    Arc, // Arc for shared ownership across threads.
};
use tauri::{Manager, State}; // Tauri utilities for managing application state.
use rfd::FileDialog; // File dialog for selecting folders.
use std::fs::File; // Struct for file operations.
use std::time::SystemTime; // Struct for handling system time.
use chrono::{DateTime, Local}; // Crate for date and time handling.

// Struct representing serial port configuration items.
#[derive(Debug)]
pub struct PortItems {
    port_path: String,
    baud_rate: u32,
}

// Struct representing the application's data state.
pub struct Data {
    port: Option<Box<dyn SerialPort>>, // Optional serial port.
    folder_path: Option<PathBuf>, // Optional path to the recording folder.
    port_items: PortItems, // Serial port configuration.
    is_thread_open: Arc<AtomicBool>, // Flag indicating if the serial thread is running.
    is_recording: bool, // Flag indicating if recording is active.
}

// Wrapper struct for thread-safe access to `Data` using a Mutex.
pub struct AppData(Mutex<Data>);

// Command to set serial port configuration items.
#[tauri::command]
fn set_port_items(
    app: tauri::AppHandle,
    state: State<AppData>,
    port: &str,
    baud: &str,
) {
    let mut state_guard = state.0.lock().unwrap();

    // Instead of println!(...), just call `backend_log`.
    backend_log(
        &app,
        &format!("Setting serial port config: port='{}', baud='{}'", port, baud),
        "INFO",
    );

    // ... do logic ...
    state_guard.port_items = PortItems {
        port_path: port.to_string(),
        baud_rate: baud.parse().expect("Invalid baud"),
    };

    backend_log(
        &app,
        &format!("Serial port config updated: {:?}", state_guard.port_items),
        "SUCCESS",
    );
}

// Command to handle serial port connection.
#[tauri::command]
fn handle_serial_connect(app: tauri::AppHandle) -> Result<bool, String> {
    let app_clone = app.clone();
    let state = app_clone.state::<AppData>();
    let mut state_guard = state.0.lock().unwrap();

    if state_guard.is_recording {
        // Emit a log before returning the error.
        backend_log(&app, "Cannot connect: recording is active. Stop recording first.", "ERROR");
        return Err("Please stop recording before disconnecting.".to_string());
    }

    match &state_guard.port {
        // If already connected, disconnect.
        Some(_) => {
            // Instead of println!("Disconnecting...");
            backend_log(&app, "Disconnecting...", "INFO");

            state_guard.is_thread_open.store(false, Ordering::Relaxed);
            while state_guard.is_thread_open.load(Ordering::Relaxed) {}
            state_guard.port = None;
            // Another log
            backend_log(&app, "Serial port successfully disconnected.", "SUCCESS");

            Ok(false)
        }
        // If not connected, try to connect.
        None => {
            backend_log(&app, "Attempting to connect to serial port...", "INFO");

            let available_ports = serial_wrapper::list_ports(app_clone.clone());
            if !available_ports.contains(&state_guard.port_items.port_path) {
                let msg = format!(
                    "The specified port '{}' is not available.",
                    state_guard.port_items.port_path
                );
                backend_log(&app, &msg, "ERROR");
                return Err(msg);
            }

            let port_result = serial_wrapper::init_port(
                app_clone.clone(),
                state_guard.port_items.port_path.to_string(),
                state_guard.port_items.baud_rate,
            );

            match port_result {
                Ok(port) => {
                    let port_clone = port.try_clone().expect("Couldn't clone port");
                    state_guard.port = Some(port);

                    // Start reading thread
                    let is_thread_open_ref = state_guard.is_thread_open.clone();
                    serial_wrapper::start_clone_thread(app_clone.clone(), port_clone, is_thread_open_ref);

                    backend_log(&app, "Serial port connected successfully.", "SUCCESS");
                    Ok(true)
                }
                Err(e) => {
                    let msg = format!("Error opening port: {}", e);
                    backend_log(&app, &msg, "ERROR");
                    Err(msg)
                }
            }
        }
    }
}

#[tauri::command]
fn handle_serial_disconnect(app: tauri::AppHandle) -> bool {
    let app_clone = app.clone();
    let state = app_clone.state::<AppData>();
    let mut state_guard = state.0.lock().unwrap();

    // Check if a serial port is currently connected.
    if let Some(_) = &state_guard.port {
        // Instead of println!("Disconnecting serial port...");
        backend_log(&app, "Disconnecting serial port...", "INFO");

        // Signal the thread to stop by setting the flag to false.
        state_guard.is_thread_open.store(false, Ordering::Relaxed);

        // Wait for the thread to acknowledge the stop signal.
        while state_guard.is_thread_open.load(Ordering::Relaxed) {}

        // Remove the serial port from the state.
        state_guard.port = None;

        // Another log
        backend_log(&app, "Serial port disconnected.", "SUCCESS");
        true
    } else {
        // Instead of println!("No serial port to disconnect.");
        backend_log(&app, "No serial port to disconnect.", "WARNING");
        false
    }
}

// Command to handle starting or stopping recording of serial data.
#[tauri::command]
fn handle_start_record(app: tauri::AppHandle) -> bool {
    let app_clone = app.clone(); // Clone the app handle.
    let state = app_clone.state::<AppData>(); // Retrieve the application state.
    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
    println!("start handle record"); // Log the action.

    // Check if recording is not currently active.
    if !state_guard.is_recording {
        // Check if a serial port is connected.
        match &state_guard.port {
            Some(port) => {
                // Check if a folder path has been set for recording.
                match &state_guard.folder_path {
                    Some(path) => {
                        // Clone the serial port for recording.
                        let port_clone = port.try_clone().unwrap();
                        let is_thread_open_ref = state_guard.is_thread_open.clone(); // Clone the thread open flag.

                        // Get the current system time.
                        let system_time = SystemTime::now();
                        // Convert system time to a DateTime object in the local timezone.
                        let datetime: DateTime<Local> = system_time.into();
                        // Format the date and time as a string for the filename.
                        let formatted_date_time = datetime.format("%Y-%m-%d_%H.%M.%S").to_string();
                        // Create the filename with the formatted date and time.
                        let file_name = format!("DCubedISM{}.txt", formatted_date_time);
                        // Combine the folder path and filename to get the full file path.
                        let file_path = path.join(file_name);

                        let path_clone = path.clone(); // Clone the path for thread usage.
                        // Attempt to create the file for recording.
                        let file = File::create(&file_path);
                        match file {
                            Ok(file) => {
                                // Signal the serial thread to stop.
                                state_guard.is_thread_open.store(false, Ordering::Relaxed);
                                // Wait for the thread to acknowledge the stop signal.
                                while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
                                // Set the recording flag to true.
                                state_guard.is_recording = true;
                                // Start the recording thread with the cloned port and file.
                                serial_wrapper::start_record_on_port(
                                    app.clone(),
                                    port_clone,
                                    is_thread_open_ref,
                                    Some(file),
                                    path_clone
                                );
                                println!("finish start clone"); // Log the action.
                                return true; // Indicate successful start of recording.
                            }
                            Err(e) => {
                                // If file creation fails, reset the recording flag.
                                state_guard.is_recording = false;
                                // Format the error message.
                                let error_description =
                                    format!("{}{}", "An error occurred creating file: ", e);
                                // Display the error message to the user.
                                rfd::MessageDialog::new()
                                    .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                                    .set_title("File Error") // Set the dialog title.
                                    .set_description(error_description.as_str()) // Set the dialog description.
                                    .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                                    .show();
                                return false; // Indicate failure to start recording.
                            }
                        }
                    }
                    None => {
                        // If no folder path is set, reset the recording flag.
                        state_guard.is_recording = false;
                        // Display an error message to the user.
                        rfd::MessageDialog::new()
                            .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                            .set_title("File Error") // Set the dialog title.
                            .set_description("File path not set.") // Set the dialog description.
                            .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                            .show();
                        return false; // Indicate failure to start recording.
                    }
                }
            }
            None => {
                // If no serial port is connected, reset the recording flag.
                state_guard.is_recording = false;
                // Display an error message to the user.
                rfd::MessageDialog::new()
                    .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                    .set_title("Port Error") // Set the dialog title.
                    .set_description("Connect to port first.") // Set the dialog description.
                    .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                    .show();
                return false; // Indicate failure to start recording.
            }
        }
    }

    // If already recording, proceed to stop recording.
    state_guard.is_recording = false; // Reset the recording flag.
    state_guard.port = None; // Remove the serial port from the state.
    state_guard.is_thread_open.store(false, Ordering::Relaxed); // Signal the thread to stop.
    // Wait for the thread to acknowledge the stop signal.
    while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
    std::mem::drop(state_guard); // Drop the lock on the state.
    handle_serial_connect(app.clone()); // Reconnect the serial port.
    return false; // Indicate that recording has been stopped.
}

// Command to set the folder path for recordings.
#[tauri::command]
fn set_folder_path(state: State<AppData>){
    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
    // Open a folder picker dialog starting at the root directory.
    let dir = FileDialog::new().set_directory("/").pick_folder();
    // Store the selected directory in the state.
    state_guard.folder_path = dir;
}

// Command to retrieve a list of available serial ports.
#[tauri::command]
fn get_ports(app: tauri::AppHandle) -> Vec<String> {
    // Instead of just println!:
    backend_log(&app, "Retrieving list of available serial ports...", "INFO");

    let ports = serial_wrapper::list_ports(app.clone());

    backend_log(
        &app,
        &format!("Available ports: {:?}", ports),
        "INFO"
    );

    ports
}


// Command to emit an error message to the frontend.
// Command to emit an error message to the frontend.
//
// Note: If you also want to log to the debug box that an error was shown, 
// you can call `backend_log` here as well.
#[tauri::command]
fn emit_error(input: String, app: tauri::AppHandle) {
    backend_log(&app, &format!("Emitting error message: {}", input), "ERROR");

    rfd::MessageDialog::new()
        .set_level(rfd::MessageLevel::Error)
        .set_title("Port Error")
        .set_description(&input)
        .set_buttons(rfd::MessageButtons::Ok)
        .show();
}


// Command to send a serial command to the connected device.
#[tauri::command]
fn send_serial(app: tauri::AppHandle, state: State<AppData>, input: Vec<u8>) {
    let mut state_guard = state.0.lock().unwrap();

    match &mut state_guard.port {
        Some(port) => {
            backend_log(
                &app,
                &format!("Preparing to send message: {:?}", input),
                "info",
            );

            match port.write(&input) {
                Ok(bytes_written) => {
                    backend_log(
                        &app,
                        &format!("Sent {} bytes.", bytes_written),
                        "success",
                    );
                    backend_log(
                        &app,
                        &format!(
                            "Message content (hex): {}",
                            input.iter()
                                .map(|b| format!("{:02X}", b))
                                .collect::<Vec<_>>()
                                .join(" "),
                        ),
                        "success",
                    );
                }
                Err(e) => {
                    backend_log(
                        &app,
                        &format!("Failed to send message: {:?}", e),
                        "error",
                    );
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error)
                        .set_title("Write Error")
                        .set_description(&format!("An error occurred writing to port: {}", e))
                        .set_buttons(rfd::MessageButtons::Ok)
                        .show();
                }
            }
        }
        None => {
            backend_log(
                &app,
                "Attempted to send message without an active port connection.",
                "error",
            );

            rfd::MessageDialog::new()
                .set_level(rfd::MessageLevel::Error)
                .set_title("Port Error")
                .set_description("Connect to port first.")
                .set_buttons(rfd::MessageButtons::Ok)
                .show();
        }
    }
}


// A simple greeting command for testing purposes.
#[tauri::command]
fn greet(app: tauri::AppHandle, name: String) {
    // Instead of println!("Hello, {}!"):
    backend_log(&app, &format!("Greeting user: {}", name), "INFO");
    // or if you still want to see it in VSCode terminal as plain text:
    // println!("Hello, {}!", name);
}

// Command to create a new window in the application.
#[tauri::command]
async fn make_window(handle: tauri::AppHandle) {
    backend_log(&handle, "Creating a new 'Setup' window...", "INFO");

    tauri::WindowBuilder::new(&handle, "Setup", tauri::WindowUrl::App("/about".into()))
        .inner_size(500.0, 500.0)
        .resizable(false)
        .always_on_top(true)
        .title("Setup")
        .build()
        .unwrap();
}

// The main function where the Tauri application is initialized and run.
fn main() {
    tauri::Builder::default()
        .manage(AppData(
            Mutex::new(Data {
                port: None,
                folder_path: Some(PathBuf::from("/home")),
                port_items: PortItems {
                    port_path: String::new(),
                    baud_rate: 0,
                },
                is_thread_open: Arc::new(AtomicBool::new(true)),
                is_recording: false,
            }),
        ))
        .invoke_handler(tauri::generate_handler![
            set_port_items,
            handle_serial_connect,
            handle_start_record,
            set_folder_path,
            greet,  // note we changed greet signature to greet(app, name)
            get_ports,
            send_serial,
            make_window,
            emit_error,
            handle_serial_disconnect
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}