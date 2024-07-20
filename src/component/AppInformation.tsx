import { Manifest } from "../model/manifest";
import "./AppInformation.css";

type AppInformationProps = { manifest?: Manifest };

function AppInformation(props: AppInformationProps) {
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
      <div className="left-section w-auto">
        <div className="app-icon">
          <img src="app-icon-url.png" alt="App Icon" />
        </div>
        {/* <button className="download-button">下载APP</button> */}
      </div>
      <div className="right-section w-full">
        <div className="file-info card">
          <h3 className="font-bold">文件信息</h3>
          <p>
            <strong className="badge">文件名</strong>rqo26oya (2).apk
          </p>
          <p>
            <strong className="badge">文件大小</strong>90.89MB
          </p>
          <p>
            <strong className="badge">MD5值</strong>
            7c091623a73e3cf3b32d423087af172d
          </p>
          <p>
            <strong className="badge">SHA1值</strong>
            84efaaae1c0de98f1aafade05358ed3e7792d35
          </p>
          <p>
            <strong className="badge">SHA256值</strong>
            30ca179b8d14716fec755c7cbb41803b08d60071a998ad5db77bd818b4dfcb9b
          </p>
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
        <div className="apk-info card">
          <h3 className="font-bold">权限列表</h3>
          <p>
            {
              props.manifest?.uses_permissions.map((permission, index) => (
                <p key={index} className="text-black">
                  {permission}
                </p>
              ))
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppInformation;
