// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
mod window;
mod model;

mod event;
mod platform;
mod jadx;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            command::greet,
            command::get_app_manifest,
            command::get_file_info,
        ])
        .setup(window::setup::setup)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
