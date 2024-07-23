import { Divider } from "antd";
import Ribbon from "../base/Ribbon";
import jadxLogo from "./../assets/jadx-logo.png";
import { invoke } from "@tauri-apps/api/core";

type HeaderComponentProps = {
  apkPath?: string;
};

function HeaderComponent(props: HeaderComponentProps) {
  console.log(props.apkPath);

  return (
    <div className="bg-white">
      <div className="flex flex-row justify-between items-center p-2">
        <Ribbon>
          <div
            className="flex flex-col justify-center items-center"
            onClick={() => {
              invoke("start_jadx_gui", {
                apk_path: props.apkPath ?? "",
              });
            }}
          >
            <img src={jadxLogo} className="h-8 w-8 mr-2" />
            <span className="text-sm font-bold mt-2">查看Java代码</span>
          </div>
        </Ribbon>
      </div>
      <Divider type="horizontal" className="m-0" />
    </div>
  );
}

export default HeaderComponent;
