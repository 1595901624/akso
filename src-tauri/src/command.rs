use std::path::PathBuf;
use aapt2::aapt2::aapt2::AAPT2;
use aapt2::model::manifest::Manifest;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn get_app_manifest(apk_path: String) -> Manifest {
//     let exe_path = std::env::current_exe().unwrap();
//     let exe_dir = exe_path.parent().unwrap();
//     // todo by any platform
//     let aapt2_path = exe_dir.join("aapt2.exe");
//     let aapt2 = AAPT2::from(aapt2_path);
//     if let Ok(manifest) = aapt2.dump_badging(PathBuf::from(apk_path)) {
//         return manifest;
//     }
//     return Manifest {
//         package: "".to_string(),
//         sdk_version: "".to_string(),
//         application: None,
//         launchable_activity: Default::default(),
//         uses_permissions: vec![],
//         application_labels: Default::default(),
//         target_sdk_version: "".to_string(),
//         application_icons: Default::default(),
//         native_code: "".to_string(),
//     };
// }
