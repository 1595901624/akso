import { Spin } from "antd";
import { FileInfo } from "../model/file_info";
import { Manifest } from "../model/manifest";
import "./AppInformation.css";
import { readFile, BaseDirectory } from "@tauri-apps/plugin-fs";
import { useEffect, useState } from "react";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { manifestUtil } from "../util/manifest_util";

type AppInformationProps = {
  manifest?: Manifest;
  fileInfo?: FileInfo;
  unzipPath?: string;
};

function AppInformation(props: AppInformationProps) {
  const [logoPath, setLogoPath] = useState<string>();

  useEffect(() => {
    // appLocalDataDir().then((path) => {
    //   join(path, "hjq_icon_logo.png").then((x) => {
    //     setLogoPath(convertFileSrc(x));
    //     console.log(convertFileSrc(x));
    //   });
    // });
    if (props.manifest != null && props.unzipPath != null) {
      if (props.manifest.application.icon != null) {
          join(
            props.unzipPath ?? "",
            manifestUtil.getAppIconPath(props.manifest)
          ).then((iconPath) => {
            setLogoPath(convertFileSrc(iconPath));
            console.log(convertFileSrc(iconPath));
          });
      }
    }
  }, [props.manifest, props.unzipPath]);

  return (
    // <div className="main-content">
    //   <div className="apk-info">
    //     <h2>应用名称: {props.manifest?.application?.label}</h2>
    //     <p>版本: {props.manifest?.package?.versionName} </p>
    //     <p>版本号: {props.manifest?.package?.versionCode}</p>
    //     <p>原始包名: {props.manifest?.package?.name}</p>
    //     <p>最低 SDK: {props.manifest?.sdk_version} </p>
    //     <p>编译目标 SDK: {props.manifest?.target_sdk_version} </p>
    //     {/* <p>编译目标 SDK: {props.manifest?.package.compileSdkVersionCodename} </p> */}
    //     <p>支持的 CPU: {props.manifest?.native_code} </p>
    //     {/* <p>权限: {props.manifest?.uses_permissions.join(",")}</p> */}
    //   </div>
    // </div>
    <div className="app-info-container w-full">
      <div className="left-section w-20 flex flex-col items-center">
        <div className="object-center w-16">
          <img src={logoPath} alt="" />
        </div>
        <p className="text-center text-sm"></p>
        {/* <button className="download-button">下载APP</button> */}
      </div>
      <div className="right-section w-full">
        <div
          className="file-info card"
          style={{
            height: "193px",
          }}
        >
          <h3 className="font-bold">文件信息</h3>
          <div
            className={`w-full h-full flex flex-col justify-center items-center ${
              props.fileInfo == undefined ? "visible" : "hidden"
            }`}
          >
            <Spin />
            <p className="mt-3">正在获取文件信息...</p>
          </div>
          <div
            className={`${props.fileInfo == undefined ? "hidden" : "visible"}`}
          >
            <p>
              <strong className="badge">文件名</strong>
              {props.fileInfo?.name}
            </p>
            <p>
              <strong className="badge">文件大小</strong>
              {props.fileInfo?.format_size}
            </p>
            <p>
              <strong className="badge">MD5值</strong>
              {props.fileInfo?.md5}
            </p>
            <p>
              <strong className="badge">SHA1值</strong>
              {props.fileInfo?.sha1}
            </p>
            <p>
              <strong className="badge">SHA256值</strong>
              {props.fileInfo?.sha256}
            </p>
          </div>
        </div>
        <div className="apk-info card">
          <h3 className="font-bold">APK信息</h3>
          <p>
            <strong className="badge">APK名称</strong>
            {props.manifest?.application?.label}
          </p>
          <p>
            <strong className="badge">包名</strong>
            {props.manifest?.package?.name}
          </p>
          <p>
            <strong className="badge">主活动</strong>
            {props.manifest?.launchable_activity?.name}
          </p>
          <p>
            <strong className="badge">安卓版本名称</strong>
            {props.manifest?.package?.versionName}
          </p>
          <p>
            <strong className="badge">安卓版本号</strong>
            {props.manifest?.package?.versionCode}
          </p>
          <p>
            <strong className="badge">最低安卓版本</strong>
            {props.manifest?.sdk_version}
          </p>
          <p>
            <strong className="badge">支持的CPU</strong>
            {props.manifest?.native_code}
          </p>
        </div>
        {/* <div className="apk-info card">
          <h3 className="font-bold">权限列表</h3>
          <p>
            {props.manifest?.uses_permissions.map((permission, index) => (
              <p key={index} className="text-black">
                {permission}
              </p>
            ))}
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default AppInformation;
