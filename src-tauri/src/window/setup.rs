use std::error::Error;

use tauri::menu::{MenuBuilder, SubmenuBuilder};
use tauri::App;

pub fn setup(app: &mut App) -> Result<(), Box<dyn Error>> {
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    // let submenu = MenuBuilder::new(app)
    //     .copy()
    //     .paste()
    //     .separator()
    //     .undo()
    //     .redo()
    //     .text("open-url", "Open URL")
    //     .check("toggle", "Toggle")
    //     .icon("show-app", "Show App", app.default_window_icon().cloned().unwrap())
    //     .build()?;
    // let menu = MenuBuilder::new(app);
    // menu.add_item(MenuItem::Submenu("File", submenu));
    // app.set_menu(menu)?;

    let submenu = SubmenuBuilder::new(app, "File")
        .copy()
        .paste()
        .separator()
        .undo()
        .redo()
        .build()?;
    let menu = MenuBuilder::new(app).item(&submenu).build()?;
    app.set_menu(menu)?;
    Ok(())
}
