import { Manifest } from "../model/manifest";

export type PermissionInformationProps = {
  manifest?: Manifest;
};

function PermissionInformation(props: PermissionInformationProps) {
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="">
        {/* <h1 className="text-2xl font-bold">权限信息</h1> */}
        <p className="text-gray-500">此应用程序需要以下权限才能正常工作：</p>
        <ul className="list-disc list-inside">
          {/* <li>Access to the file system</li>
          <li>Access to the clipboard</li> */}
          {
            props.manifest?.uses_permissions.map((permission, index) => (
              <li key={index}>{permission}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default PermissionInformation;
