use std::error::Error;
use std::str::FromStr;
use tauri::menu::{AboutMetadata, MenuBuilder, MenuId, PredefinedMenuItem, SubmenuBuilder};
use tauri::{App, Emitter};
use tauri::RunEvent::MenuEvent;

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

    let file_submenu = SubmenuBuilder::new(app, "文件")
        .text("open", "打开")
        .separator()
        .build()?;

    let edit_submenu = SubmenuBuilder::new(app, "编辑")
        .item(&PredefinedMenuItem::copy(app, Some("复制"))?)
        .item(&PredefinedMenuItem::paste(app, Some("粘贴"))?)
        .separator()
        .item(&PredefinedMenuItem::undo(app, Some("撤销"))?)
        .item(&PredefinedMenuItem::redo(app, Some("重做"))?)
        .build()?;

    let mut about_metadata = AboutMetadata::default();
    about_metadata.name = Some("Akso".to_string());
    about_metadata.version = Some("0.1.0".to_string());
    about_metadata.website = Some("https://github.com/1595901624/akso".to_string());
    about_metadata.website_label = Some("GitHub".to_string());
    about_metadata.license = Some("MIT".to_string());
    about_metadata.credits = Some("Akso".to_string());
    about_metadata.icon = Some(app.default_window_icon().cloned().unwrap());
    about_metadata.authors = Some(vec!["Cloris".to_string()]);

    let help_submenu = SubmenuBuilder::new(app, "帮助")
        .item(&PredefinedMenuItem::about(app, Some("关于"), Some(about_metadata))?)
        .build()?;

    let menu = MenuBuilder::new(app)
        .item(&file_submenu)
        .item(&edit_submenu)
        .item(&help_submenu)
        .build()?;
    app.set_menu(menu)?;

    app.on_menu_event(move |app_handle, event| {
        // let open_id = MenuId::from_str("open").unwrap();
        match event.id().as_ref() {
            "open" => {
                println!("open");
                let _ = app_handle.emit("open", ());
            }
            _ => {}
        }
    });
    Ok(())
}
