use std::path::PathBuf;
use aapt2::aapt2::aapt2::AAPT2;
use crate::jadx::Jadx;

#[cfg(target_os = "windows")]
mod win;
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
    return win::get_aapt2_path();
}

#[cfg(target_os = "linux")]
fn get_aapt2_path() -> PathBuf {
    return linux::get_exe_path();
}

#[cfg(target_os = "windows")]
fn get_jadx_path() -> PathBuf {
    return win::get_jadx_path();
}

#[cfg(target_os = "macos")]
fn get_jadx_path() -> PathBuf {
    return macos::get_jadx_path();
}

#[cfg(target_os = "linux")]
fn get_jadx_path() -> PathBuf {
    return linux::get_jadx_path();
}

#[cfg(target_os = "windows")]
fn get_jadx_gui_path() -> PathBuf {
    return win::get_jadx_gui_path();
}

#[cfg(target_os = "macos")]
fn get_jadx_gui_path() -> PathBuf {
    return macos::get_jadx_gui_path();
}

#[cfg(target_os = "linux")]
fn get_jadx_gui_path() -> PathBuf {
    return linux::get_jadx_gui_path();
}

pub(crate) fn create_aapt2() -> AAPT2 {
    AAPT2::from(get_aapt2_path())
}

pub(crate) fn create_jadx() -> Jadx {
    println!("jadx path: {}", get_jadx_path().display());
    println!("jadx-gui path: {}", get_jadx_gui_path().display());
    Jadx::new(get_jadx_path(), get_jadx_gui_path())
}