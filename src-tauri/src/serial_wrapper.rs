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

use std::collections::HashMap;
use std::sync::Mutex;

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

/// Auxiliary function to log messages both to the terminal and the frontend via event.
///
/// - `app`: `AppHandle` used to emit the event.
/// - `message`: the log text.
/// - `level`: a string indicating the log level, e.g. "INFO", "ERROR", "WARNING", "SUCCESS", etc.
pub fn backend_log(app: &tauri::AppHandle, message: &str, level: &str) {
    // Log no terminal do backend com timestamp
    let timestamp = chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let detailed_message = format!("[{}] [{}] {}", timestamp, level, message);
    println!("{}", detailed_message);

    // Emite apenas a mensagem e tipo para o frontend, sem timestamp
    let payload = serde_json::json!({
        "message": message, // Apenas a mensagem
        "type": level.to_lowercase(), // Tipo do log
    });

    if let Err(err) = app.emit_all("backendLog", payload) {
        println!(
            "[{}] [WARNING] Failed to emit log to the frontend: {:?}",
            timestamp, err
        );
    }
}



/// Function to list available serial ports and return them as a vector of strings.
pub fn list_ports(app: tauri::AppHandle) -> Vec<String> {
    println!(
        "[{}] [INFO] Listing available ports...",
        chrono::Local::now().format("%Y-%m-%d %H:%M:%S")
    );
    match serialport::available_ports() {
        Ok(ports) => {
            let port_list: Vec<String> = ports.iter().map(|p| p.port_name.clone()).collect();
            println!(
                "[{}] [INFO] Ports found: {:?}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                port_list
            );
            port_list
        }
        Err(e) => {
            println!(
                "[{}] [ERROR] Error listing ports: {}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                e
            );
            vec![]
        }
    }
}

/// Function to initialize a serial port with the given path and baud rate.
pub fn init_port(
    app: tauri::AppHandle,
    port_path: String,
    baud_rate: u32,
) -> Result<Box<dyn SerialPort>> {
    println!(
        "[{}] [INFO] Opening port: {}, baud: {}",
        chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
        port_path,
        baud_rate
    );

    let port_path_clone = port_path.clone();
    let port = serialport::new(port_path, baud_rate)
        .timeout(Duration::from_secs(5))
        .open();

    match port {
        Ok(p) => {
            println!(
                "[{}] [SUCCESS] Port '{}' opened successfully with baud rate {}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                port_path_clone,
                baud_rate
            );

            // Emitting success to the frontend
            if let Err(e) = app.emit_all("backendLog", {
                serde_json::json!({
                    "message": format!("Port '{}' opened successfully with baud rate {}", port_path_clone, baud_rate),
                    "type": "SUCCESS",
                })
            }) {
                println!(
                    "[{}] [ERROR] Failed to emit port-open success to the frontend: {:?}",
                    chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                    e
                );
            }

            Ok(p)
        }
        Err(e) => {
            println!(
                "[{}] [ERROR] Failed to open port '{}': {:?}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                port_path_clone,
                e
            );

            // Emitting error to the frontend
            if let Err(err) = app.emit_all("backendLog", {
                serde_json::json!({
                    "message": format!("Failed to open port '{}': {:?}", port_path_clone, e),
                    "type": "error",
                })
            }) {
                println!(
                    "[{}] [ERROR] Failed to emit port-open error to the frontend: {:?}",
                    chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                    err
                );
            }

            Err(e)
        }
    }
}

/// Function to start a thread that continuously reads from the serial port.
/// Modificação na thread para processar mensagens completas
/// Function to start a thread that continuously reads from the serial port.
pub fn start_clone_thread(
    app: tauri::AppHandle,
    mut port_clone: Box<dyn SerialPort>,
    is_thread_open: Arc<AtomicBool>,
) {
    let mut serial_buf: Vec<u8> = Vec::new();

    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed);
        backend_log(&app, "Serial communication thread started.", "INFO");

        while is_thread_open.load(Ordering::Relaxed) {
            let mut byte = [0u8; 1];
            match port_clone.read(&mut byte) {
                Ok(_) => {
                    // Log cada byte recebido
                    backend_log(&app, &format!("Received 1 byte: {:?}", byte[0]), "INFO");

                    // Adiciona byte ao buffer
                    serial_buf.push(byte[0]);

                    // Verifica se o buffer contém 7 bytes (mensagem completa)
                    if serial_buf.len() == 7 {
                        let command_id = serial_buf[0];
                        let hardware_id = serial_buf[1];
                        let value = (serial_buf[2] as u32)
                            | ((serial_buf[3] as u32) << 8)
                            | ((serial_buf[4] as u32) << 16)
                            | ((serial_buf[5] as u32) << 24);
                    
                        backend_log(
                            &app,
                            &format!(
                                "Received complete message: {:?} (Hex: {})",
                                serial_buf,
                                serial_buf.iter()
                                    .map(|b| format!("{:02X}", b))
                                    .collect::<Vec<_>>()
                                    .join(" ")
                            ),
                            "SUCCESS"
                        );

                        backend_log(
                            &app,
                            &format!(
                                "Parsed Message -> COMMAND_ID: {}, HARDWARE_ID: {}, VALUE: {}",
                                command_id, hardware_id, value
                            ),
                            "INFO"
                        );

                        // Envia os dados completos para o frontend
                            if let Err(e) = app.emit_all("updateSerial", BinaryPayload { data: serial_buf.clone() }) {
                                backend_log(
                                    &app,
                                    &format!("Failed to emit message to frontend: {:?}", e),
                                    "error"
                                );
                            }

                            // Limpa o buffer para a próxima mensagem
                            serial_buf.clear();
                        }
                }
                //backend_log(&app, "Read timed out.", "warning");
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => {
                    
                }
                Err(e) => {
                    backend_log(&app, &format!("Error reading from serial port: {:?}", e), "error");
                    break;
                }
            }
        }

        backend_log(&app, "Serial communication thread terminated.", "INFO");
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
pub fn write_serial_with_buffer(port: &mut Box<dyn SerialPort>, input: &[u8]) -> std::result::Result<usize, String> {
    match port.write(input) {
        Ok(bytes_written) => Ok(bytes_written),
        Err(e) => Err(format!("Error writing to serial port: {}", e)),
    }
}
*/
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