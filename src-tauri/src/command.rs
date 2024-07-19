use aapt2::aapt2::aapt2::AAPT2;
use aapt2::model::manifest::Manifest;
use std::path::PathBuf;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/// get app manifest
/// # Arguments
/// * apk_path: apk path
#[tauri::command(rename_all = "snake_case")]
pub fn get_app_manifest(apk_path: String) -> Manifest {
    println!("apk path: {}", apk_path);
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    // todo by any platform
    let aapt2_path = exe_dir.join("aapt2.exe");

    println!("aapt2 path: {}", aapt2_path.display());
    let aapt2 = AAPT2::from(aapt2_path);
    // if let Ok(manifest) = aapt2.dump_badging(PathBuf::from(apk_path)) {
    //     return manifest;
    // }

    match aapt2.dump_badging(PathBuf::from(apk_path)) {
        Ok(manifest) => {
            return manifest;
        }
        Err(e) => {
            println!("error: {}", e)
        }
    };
    return Manifest::default();
}
