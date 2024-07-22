/// macos的 exe 路径
/// macos: aapt2
pub(crate) fn get_exe_path() -> std::path::PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    return exe_dir.join("aapt2");
}