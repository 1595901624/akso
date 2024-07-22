import { Divider } from "antd";
import Ribbon from "../base/Ribbon";
import jadxLogo from "./../assets/jadx-logo.png";

function HeaderComponent() {
  return (
    <div className="bg-white">
      <div className="flex flex-row justify-between items-center p-2">
        <Ribbon>
          <div className="flex flex-col justify-center items-center">
            <img src={jadxLogo} className="h-8 w-8 mr-2" />
            <span className="text-sm font-bold mt-2">Jadx 反编译</span>
          </div>
        </Ribbon>
      </div>
      <Divider type="horizontal" className="m-0" />
    </div>
  );
}

export default HeaderComponent;
