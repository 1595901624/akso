use std::error::Error;
use tauri::{App, Manager};
use tauri::menu::MenuBuilder;

pub fn setup(app: &mut App) -> Result<(), Box<dyn Error>> {
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let menu = MenuBuilder::new(app)
        .copy()
        .paste()
        .separator()
        .undo()
        .redo()
        .text("open-url", "Open URL")
        .check("toggle", "Toggle")
        .icon("show-app", "Show App", app.default_window_icon().cloned().unwrap())
        .build()?;
    app.set_menu(menu)?;
    Ok(())
}