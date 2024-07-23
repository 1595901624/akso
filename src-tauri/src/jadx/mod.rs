use std::io;
use std::path::PathBuf;
use std::process::Command;
use crate::platform;

pub struct Jadx {
    command_path: PathBuf,
    gui_path: PathBuf,
}

impl Jadx {
    pub fn new(command_path: PathBuf, gui_path: PathBuf) -> Self {
        return Jadx {
            command_path,
            gui_path,
        };
    }


    /// Get the version of jadx
    pub fn version(&self) -> io::Result<String> {
        let status = Command::new(self.command_path.as_os_str())
            .arg("--version")
            .output()?;

        return if status.status.success() {
            Ok(String::from_utf8_lossy(&status.stdout).trim().to_string())
        } else {
            Err(io::Error::new(io::ErrorKind::Other, String::from_utf8_lossy(&status.stderr)))
        };
    }
}

#[test]
fn test_version() {
    let jadx = platform::create_jadx();
    let version = jadx.version().unwrap();
    println!("{}", version);
}