use std::path::PathBuf;
use aapt2::aapt2::aapt2::AAPT2;

#[cfg(target_os = "windows")]
mod windows;
#[cfg(target_os = "macos")]
mod macos;

#[cfg(target_os = "linux")]
mod linux;


#[cfg(target_os = "macos")]
fn get_aapt2_path() -> PathBuf {
    return macos::get_exe_path();
}

#[cfg(target_os = "windows")]
fn get_aapt2_path() -> PathBuf {
    return windows::get_exe_path();
}

#[cfg(target_os = "linux")]
fn get_aapt2_path() -> PathBuf {
    return linux::get_exe_path();
}

pub(crate) fn create_aapt2() -> AAPT2 {
    AAPT2::from(get_aapt2_path())
}

fn start_jadx(apk_path: PathBuf) {}