import { Manifest } from "../model/manifest";

class ManifestUtil {
  /**
     * 获取logo的相对路径
     *  LDPI = 120,
        MDPI = 160,
        HDPI = 240,
        XHDPI = 320,
        XXHDPI = 480,
        XXXHDPI = 640,
     * @param manifest 
     * @returns 
     */
  getAppIconPath(manifest: Manifest): string {
    console.log(manifest.application_icons);
    const icon_list = manifest.application_icons;
    const icon640 = icon_list["XXXHDPI"];
    if (icon640 != undefined) {
      return icon640;
    }

    const icon480 = icon_list["XXHDPI"];
    if (icon480 != undefined) {
      return icon480;
    }

    const icon320 = icon_list["XHDPI"];
    if (icon320 != undefined) {
      return icon320;
    }

    const icon240 = icon_list["HDPI"];
    if (icon240 != undefined) {
      return icon240;
    }

    const icon160 = icon_list["MDPI"];
    if (icon160 != undefined) {
      return icon160;
    }

    const icon120 = icon_list["LDPI"];
    if (icon120 != undefined) {
      return icon120;
    }
    return manifest.application.icon ?? "";
  }
}


export const manifestUtil = new ManifestUtil();