use serde::{Deserialize, Serialize};

// 文件名、文件大小、MD5 值、SHA1 值和 SHA256 值
#[derive(Debug, Serialize, Deserialize, Default)]
pub(crate) struct FileInfo {
    pub(crate) name: String,
    pub(crate) size: u64,
    pub(crate) format_size: String,
    pub(crate) md5: String,
    pub(crate) sha1: String,
    pub(crate) sha256: String,
}