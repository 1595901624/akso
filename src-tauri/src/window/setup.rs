use std::error::Error;

use tauri::{App, Emitter};
use tauri::menu::{AboutMetadata, MenuBuilder, PredefinedMenuItem, SubmenuBuilder};
use crate::event::menu_event;
use crate::platform;

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
        .text(menu_event::EVENT_OPEN_FILE, "打开")
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

    let mut about_aapt2_metadata = AboutMetadata::default();
    about_aapt2_metadata.name = Some("AAPT2".to_string());
    about_aapt2_metadata.version = Some(get_aapt2_version());

    let mut about_jadx_metadata = AboutMetadata::default();
    about_jadx_metadata.name = Some("Jadx".to_string());
    about_jadx_metadata.version = Some(get_jadx_version());

    let help_submenu = SubmenuBuilder::new(app, "帮助")
        .item(&PredefinedMenuItem::about(app, Some("关于 Jadx"), Some(about_jadx_metadata))?)
        .item(&PredefinedMenuItem::about(app, Some("关于 AAPT2"), Some(about_aapt2_metadata))?)
        .item(&PredefinedMenuItem::about(app, Some("关于 Akso"), Some(about_metadata))?)
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
            menu_event::EVENT_OPEN_FILE => {
                println!("open");
                let _ = app_handle.emit(menu_event::EVENT_OPEN_FILE, ());
            }
            _ => {}
        }
    });
    Ok(())
}

fn get_aapt2_version() -> String {
    let aapt2 = platform::create_aapt2();
    return aapt2.version().unwrap_or("Unknown".to_string());
}

fn get_jadx_version() -> String {
    let jadx = platform::create_jadx();
    return jadx.version().unwrap_or("Unknown".to_string());
}
