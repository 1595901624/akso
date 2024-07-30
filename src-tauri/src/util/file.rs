use std::fs::File;
use std::path::PathBuf;

use zip::ZipArchive;

/// get project cache path
/// ${exe_dir}/project/package_name
pub(crate) fn get_project_cache_path() -> PathBuf {
    let exe_path = std::env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    if exe_dir.join("project").exists() {
        return exe_dir.join("project");
    }
    std::fs::create_dir_all(exe_dir.join("project")).unwrap();
    return exe_dir.join("project");
}

/// unzip file
pub(crate) fn unzip_file(zip_path: String, dest_path: String) -> zip::result::ZipResult<()> {
    let file = File::open(&zip_path).expect("Unable to open ZIP file");
    let mut archive = ZipArchive::new(file)?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;
        // println!("Unzipping file {}", file.name());
        let out_path = match file.enclosed_name() {
            Some(path) => PathBuf::from(&dest_path).join(path),
            None => continue,
        };
        
        // {
        //     let comment = file.comment();
        //     if !comment.is_empty() {
        //         println!("File {} comment: {}", i, comment);
        //     }
        // }

        if file.name().ends_with('/') {
            // println!("File {} extracted to \"{}\"", i, out_path.display());
            std::fs::create_dir_all(&out_path)?;
        } else {
            // println!(
            //     "File {} extracted to \"{}\" ({} bytes)",
            //     i,
            //     out_path.display(),
            //     file.size()
            // );
            if let Some(p) = out_path.parent() {
                if !p.exists() {
                    std::fs::create_dir_all(&p)?;
                }
            }
            let mut outfile = File::create(&out_path)?;
            std::io::copy(&mut file, &mut outfile)?;
        }

        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;

            if let Some(mode) = file.unix_mode() {
                std::fs::set_permissions(&out_path, std::fs::Permissions::from_mode(mode)).unwrap();
            }
        }
    }
    Ok(())
}
