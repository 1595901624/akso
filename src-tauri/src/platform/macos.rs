/// macos的 exe 路径
/// macos: aapt2
pub(crate) fn get_aapt2_path() -> std::path::PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    return exe_dir.join("aapt2").join("macos").join("aapt2");
}

/// jadx 路径
pub(crate) fn get_jadx_path() -> std::path::PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    return exe_dir.join("jadx").join("bin").join("jadx");
}

/// jadx-gui 路径
pub(crate) fn get_jadx_gui_path() -> std::path::PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    return exe_dir.join("jadx").join("bin").join("jadx-gui");
}
