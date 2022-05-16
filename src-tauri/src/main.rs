#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::fs::read_to_string;

#[tauri::command]
fn read_file(file_path: String) -> String {
    return read_to_string(file_path).unwrap_or_default();
}

#[tauri::command]
fn write_file(file_path: String, content: String) {
    std::fs::write(file_path, content).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_file, write_file])
        .run(tauri::generate_context!())
        .expect("Error while running VS Mini application");
}
