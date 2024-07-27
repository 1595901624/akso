// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
mod model;
mod window;

mod event;
mod jadx;
mod platform;
mod util;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            command::greet,
            command::get_app_manifest,
            command::get_file_info,
            command::start_jadx_gui,
            command::unzip_apk
        ])
        .setup(window::setup::setup)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
