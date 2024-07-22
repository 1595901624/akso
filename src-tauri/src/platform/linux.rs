use std::path::PathBuf;

/// exe 路径
/// linux: aapt2
pub(crate) fn get_exe_path() -> PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    return exe_dir.join("aapt2");
}