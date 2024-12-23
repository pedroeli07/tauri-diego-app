// Prevents an additional console window on Windows in release builds.
// DO NOT REMOVE!! This is essential for Tauri's window management on Windows.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Importing the `serial_wrapper` module which contains serial port handling functions.
mod serial_wrapper;

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
pub struct PortItems {
    port_path: String, // Path to the serial port.
    baud_rate: u32, // Baud rate for serial communication.
 // Line ending characters (e.g., "\n").   ending: String, 
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
fn set_port_items(state: State<AppData>, port: &str, baud: &str){
    // Acquire the lock on the state.
    let mut state_guard = state.0.lock().unwrap();
    
    // Update the port items with new values.
    state_guard.port_items = PortItems {
        port_path: port.to_string(),
        baud_rate: baud.to_string().parse::<u32>().unwrap(), // Parse baud rate from string to u32.
       // ending: ending.to_string()
    };
}

// Command to handle serial port connection.
#[tauri::command]
fn handle_serial_connect(app: tauri::AppHandle) -> bool {

    // Clone the app handle for use in the thread.
    let app_clone = app.clone();
    
    // Retrieve the application state.
    let state = app_clone.state::<AppData>();
    
    // Acquire the lock on the state.
    let mut state_guard = state.0.lock().unwrap();

    // Check if the application is currently recording.
    if state_guard.is_recording {
        // Display an error message if recording is active.
        rfd::MessageDialog::new()
        .set_level(rfd::MessageLevel::Error) // Set the message level to error.
        .set_title("Port Error") // Set the dialog title.
        .set_description("Please stop recording before disconnecting") // Set the dialog description.
        .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
        .show();
        return true;
    }

    // Check if a serial port is already connected.
    match &state_guard.port {
        // If a port exists, proceed to disconnect.
        Some(_) => {
            println!("Killing thread"); // Log the action.
            // Signal the thread to stop by setting the flag to false.
            state_guard.is_thread_open.store(false, Ordering::Relaxed);
            // Wait for the thread to acknowledge the stop signal.
            while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
            // Remove the serial port from the state.
            state_guard.port = None;
            return false; // Indicate that the port has been disconnected.
        }
        // If no port is connected, attempt to connect.
        None => {
            // Initialize the serial port using the provided configuration.
            let port = serial_wrapper::init_port(state_guard.port_items.port_path.to_string(), state_guard.port_items.baud_rate);
            // Check if the port was successfully opened.
            match port {
                Ok(port) => {
                    // Clone the port for thread usage.
                    let port_clone = port.try_clone().expect("Couldn't clone port");
                    // Store the port in the application state.
                    state_guard.port = Some(port);
                    // Clone the thread open flag for thread communication.
                    let is_thread_open_ref = state_guard.is_thread_open.clone();
                    // Start the serial reading thread.
                    serial_wrapper::start_clone_thread(app.clone(), port_clone, is_thread_open_ref);
                }
                Err(e) => {
                    // Format the error message.
                    let error_description = format!("{}{}", "An error occurred opening port: ", e);
                    // Display the error message to the user.
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                        .set_title("Port Error") // Set the dialog title.
                        .set_description(error_description.as_str()) // Set the dialog description.
                        .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                        .show();

                    return false; // Indicate that the port connection failed.
                }
            }
        }
    }
    return true; // Indicate that the port connection was successful.
}

// Command to handle serial port disconnection.
#[tauri::command]
fn handle_serial_disconnect(app: tauri::AppHandle) -> bool {
    let app_clone = app.clone(); // Clone the app handle.
    let state = app_clone.state::<AppData>(); // Retrieve the application state.
    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.

    // Check if a serial port is currently connected.
    if let Some(_) = &state_guard.port {
        println!("Disconnecting serial port..."); // Log the action.

        // Signal the thread to stop by setting the flag to false.
        state_guard.is_thread_open.store(false, Ordering::Relaxed);

        // Wait for the thread to acknowledge the stop signal.
        while state_guard.is_thread_open.load(Ordering::Relaxed) {}

        // Remove the serial port from the state.
        state_guard.port = None;

        println!("Serial port disconnected."); // Log the action.
        return true; // Indicate successful disconnection.
    } else {
        println!("No serial port to disconnect."); // Log the absence of a connected port.
        return false; // Indicate that there was no port to disconnect.
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
fn get_ports() -> Vec<String> {
    return serial_wrapper::list_ports(); // Call the `list_ports` function from `serial_wrapper`.
}

// Command to emit an error message to the frontend.
#[tauri::command]
fn emit_error(input: String) {
    rfd::MessageDialog::new()
    .set_level(rfd::MessageLevel::Error) // Set the message level to error.
    .set_title("Port Error") // Set the dialog title.
    .set_description(input.as_str()) // Set the dialog description.
    .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
    .show();
}

// Command to send a serial command to the connected device.
#[tauri::command]
fn send_serial(state: State<AppData>, input: Vec<u8>) {
    let mut state_guard = state.0.lock().unwrap();
    match &mut state_guard.port {
        Some(port) => {
            // Tenta escrever o array de bytes diretamente
            match port.write(&input) {
                Ok(s) => {
                    println!("Write {} bytes success", s);
                }
                Err(e) => {
                    let error_description = format!("An error occurred writing to port: {}", e);
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error)
                        .set_title("Write Error")
                        .set_description(error_description.as_str())
                        .set_buttons(rfd::MessageButtons::Ok)
                        .show();
                }
            }
        }
        None => {
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
fn greet(name: &str) {
    println!("Hello, {}!", name); // Print a greeting message to the console.
}

// Command to create a new window in the application.
#[tauri::command]
async fn make_window(handle: tauri::AppHandle) {
    // Build a new window named "Setup" pointing to the "/about" page.
    tauri::WindowBuilder::new(&handle, "Setup", tauri::WindowUrl::App("/about".into()))
        .inner_size(500.0, 500.0) // Set the window size.
        .resizable(false) // Make the window non-resizable.
        .always_on_top(true) // Keep the window always on top.
        .title("Setup") // Set the window title.
        .build() // Build the window.
        .unwrap(); // Unwrap to handle potential errors.
}

// The main function where the Tauri application is initialized and run.
fn main() {

    // Initialize the Tauri builder.
    tauri::Builder::default()
        .manage(AppData(
            // Create a new, uninitialized Data instance wrapped in a Mutex for thread safety.
            Mutex::new(Data {
                port: None, // No serial port connected initially.
                folder_path: Some(PathBuf::from("/home")), // Default folder path for recordings.
                port_items: PortItems {
                    port_path: String::from(""), // Empty port path initially.
                    baud_rate: 0, // Baud rate set to 0 initially.
                   // ending: String::from("") // No line ending initially.
                },
                is_thread_open: Arc::new(AtomicBool::new(true)), // Thread flag set to true.
                is_recording: false, // Not recording initially.
            }),
        ))
        .invoke_handler(tauri::generate_handler![
            set_port_items, // Handler for setting port items.
            handle_serial_connect, // Handler for connecting to serial port.
            handle_start_record, // Handler for starting/stopping recording.
            set_folder_path, // Handler for setting the recording folder path.
            greet, // Handler for greeting.
            get_ports, // Handler for retrieving available serial ports.
            send_serial, // Handler for sending serial commands.
            make_window, // Handler for creating new windows.
            emit_error, // Handler for emitting error messages.
            handle_serial_disconnect // Handler for disconnecting serial port.
        ])
        .run(tauri::generate_context!()) // Run the Tauri application with the generated context.
        .expect("error while running tauri application"); // Expect no errors during runtime.
}
