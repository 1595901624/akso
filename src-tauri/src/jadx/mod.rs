use std::io;
use std::os::windows::process::CommandExt;
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
        // let status = Command::new(self.command_path.as_os_str())
        //     .arg("--version")
        //     .output()?;
        let mut command = Command::new(self.command_path.as_os_str());
        let mut status = command
            .arg("--version");

        if cfg!(target_os = "windows") {
            status = status
                .creation_flags(0x08000000)
        }
        let status = status.output()?;

        return if status.status.success() {
            Ok(String::from_utf8_lossy(&status.stdout).trim().to_string())
        } else {
            Err(io::Error::new(io::ErrorKind::Other, String::from_utf8_lossy(&status.stderr)))
        };
    }

    /// Start jadx-gui
    pub fn start_gui(&self, apk_path: PathBuf) {
        let mut command = Command::new(self.gui_path.as_os_str());
        let mut status = command
            .arg(apk_path.as_os_str());
        if cfg!(target_os = "windows") {
            status = status
                .creation_flags(0x08000000)
        }
        let _ = status.spawn();
    }
}