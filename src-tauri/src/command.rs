use std::error::Error;
use std::fs::File;
use std::io::Read;
use std::path::PathBuf;

use aapt2::model::manifest::Manifest;
use sha::utils::{Digest, DigestExt};
use sha::{sha1, sha256};

use crate::model::file_info::FileInfo;
use crate::{platform, util};
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
    let aapt2 = platform::create_aapt2();

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

#[tauri::command(rename_all = "snake_case")]
pub async fn get_file_info(apk_path: String) -> FileInfo {
    let path = PathBuf::from(apk_path);
    let file_name: String = path.file_name().unwrap().to_str().unwrap().to_string();
    let file_size: u64 = path.metadata().unwrap().len();
    let format_size: String = format_size(file_size);

    let file = File::open(&path);
    if file.is_err() {
        return FileInfo::default();
    }
    let mut file = file.unwrap();
    let mut buffer = Vec::new();
    let _ = file.read_to_end(&mut buffer);

    let md5 = md5::compute(&buffer);
    let sha1 = sha1::Sha1::default().digest(&buffer).to_hex();
    let sha256 = sha256::Sha256::default().digest(&buffer).to_hex();

    return FileInfo {
        name: file_name,
        size: file_size,
        format_size,
        md5: format!("{:x}", md5),
        sha1,
        sha256,
    };
}

#[tauri::command(rename_all = "snake_case")]
pub fn start_jadx_gui(apk_path: String) {
    let jadx = platform::create_jadx();
    jadx.start_gui(PathBuf::from(apk_path));
}

/// unzip apk
#[tauri::command(rename_all = "snake_case")]
pub async fn unzip_apk(apk_path: String, dest_path: String) -> bool {
    // println!(
    //     "unzip_apk, apk path: {}, package name: {}",
    //     apk_path, package_name
    // );

    // let dest_path = util::file::get_project_cache_path().join(package_name);
    // println!("unzip_apk, dest path: {}", &dest_path.display());
    let dest_path = PathBuf::from(dest_path);
    if !dest_path.exists() {
        std::fs::create_dir_all(&dest_path).unwrap();
    }

    let result = util::file::unzip_file(apk_path, dest_path.to_str().unwrap().to_string());
    if result.is_err() {
        let error = result.err().unwrap();
        println!("unzip_apk error: {}", error.to_string());
        return false;
    }
    return true;
}

/// format size GB MB KB B
fn format_size(size: u64) -> String {
    return if size < 1024 {
        format!("{} B", size)
    } else if size < 1024 * 1024 {
        format!("{} KB", size / 1024)
    } else if size < 1024 * 1024 * 1024 {
        format!("{} MB", size / 1024 / 1024)
    } else {
        format!("{} GB", size / 1024 / 1024 / 1024)
    };
}
