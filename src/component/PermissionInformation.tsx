import { Segmented, Table } from "antd";
import { Manifest } from "../model/manifest";
import "./PermissionInformation.css";
import { useEffect, useState } from "react";

const PAGE_SIZE = 8;

const dangerousPermissionNameList = [
  "android.permission.ACCEPT_HANDOVER",
  "android.permission.ACCESS_BACKGROUND_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACTIVITY_RECOGNITION",
  "android.permission.ADD_VOICEMAIL",
  "android.permission.ANSWER_PHONE_CALLS",
  "android.permission.BODY_SENSORS",
  "android.permission.CALL_PHONE",
  "android.permission.CAMERA",
  "android.permission.GET_ACCOUNTS",
  "android.permission.PROCESS_OUTGOING_CALLS",
  "android.permission.READ_CALENDAR",
  "android.permission.READ_CALL_LOG",
  "android.permission.READ_CONTACTS",
  "android.permission.READ_PHONE_NUMBERS",
  "android.permission.READ_PHONE_STATE",
  "android.permission.READ_SMS",
  "android.permission.RECEIVE_MMS",
  "android.permission.RECEIVE_SMS",
  "android.permission.RECEIVE_WAP_PUSH",
  "android.permission.RECORD_AUDIO",
  "android.permission.SEND_SMS",
  "android.permission.USE_SIP",
  "android.permission.WRITE_CALENDAR",
  "android.permission.WRITE_CALL_LOG",
  "android.permission.WRITE_CONTACTS",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE",
];

export type PermissionInformationProps = {
  manifest?: Manifest;
};

/// 所有权限信息
function getAllPermissions(uses_permissions: string[]) {
  const tempDataSource = uses_permissions.flatMap((permission, index) => {
    return [
      {
        key: index,
        permission: permission,
        note: "",
      },
    ];
  });

  // 判断 dataSource 是否为 PAGE_SIZE 的倍数
  if (tempDataSource && tempDataSource.length % PAGE_SIZE !== 0) {
    // 如果不是 PAGE_SIZE 的倍数，则添加空行达到 PAGE_SIZE 的倍数
    while (tempDataSource.length % PAGE_SIZE !== 0) {
      tempDataSource.push({
        key: tempDataSource.length,
        permission: "\u00a0",
        note: "",
      });
    }
  }
  return tempDataSource;
}

// 高危权限信息
function getDangerousPermission(uses_permissions: string[]) {
  const dangerousPermission = uses_permissions
    .filter((permission) => {
      return dangerousPermissionNameList.includes(permission.trim());
    })
    .flatMap((permission, index) => {
      return [
        {
          key: index,
          permission: permission,
          note: "",
        },
      ];
    });

  // 判断 dataSource 是否为 PAGE_SIZE 的倍数
  if (dangerousPermission && dangerousPermission.length % PAGE_SIZE !== 0) {
    // 如果不是 PAGE_SIZE 的倍数，则添加空行达到 PAGE_SIZE 的倍数
    while (dangerousPermission.length % PAGE_SIZE !== 0) {
      dangerousPermission.push({
        key: dangerousPermission.length,
        permission: "\u00a0",
        note: "",
      });
    }
  }
  return dangerousPermission;
}

// 普通权限信息
function getNormalPermission(uses_permissions: string[]) {
  const normalPermission = uses_permissions
    .filter((permission) => {
      return !dangerousPermissionNameList.includes(permission.trim());
    })
    .flatMap((permission, index) => {
      return [
        {
          key: index,
          permission: permission,
          note: "",
        },
      ];
    });

  // 判断 dataSource 是否为 PAGE_SIZE 的倍数
  if (normalPermission && normalPermission.length % PAGE_SIZE !== 0) {
    // 如果不是 PAGE_SIZE 的倍数，则添加空行达到 PAGE_SIZE 的倍数
    while (normalPermission.length % PAGE_SIZE !== 0) {
      normalPermission.push({
        key: normalPermission.length,
        permission: "\u00a0",
        note: "",
      });
    }
  }
  return normalPermission;
}

/**
 * 获取私有权限
 * @param uses_permissions 
 * @returns 
 */
function getPrivatePermission(uses_permissions: string[]) {
  const privatePermission = uses_permissions
    .filter((permission) => {
      return !permission.startsWith("android.permission");
    })
    .flatMap((permission, index) => {
      return [
        {
          key: index,
          permission: permission,
          note: "",
        },
      ];
    });

  // 判断 dataSource 是否为 PAGE_SIZE 的倍数
  if (privatePermission && privatePermission.length % PAGE_SIZE !== 0) {
    // 如果不是 PAGE_SIZE 的倍数，则添加空行达到 PAGE_SIZE 的倍数
    while (privatePermission.length % PAGE_SIZE !== 0) {
      privatePermission.push({
        key: privatePermission.length,
        permission: "\u00a0",
        note: "",
      });
    }
  }
  return privatePermission;
}

function PermissionInformation(props: PermissionInformationProps) {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    setDataSource(getAllPermissions(props.manifest?.uses_permissions ?? []));
  }, [props.manifest?.uses_permissions]);

  const columns = [
    {
      title: "权限",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "备注",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="">
        {/* <h1 className="text-2xl font-bold">权限信息</h1> */}
        <Segmented<string>
          options={["所有权限", "高危权限", "普通权限", "私有权限"]}
          onChange={(value) => {
            // console.log(value); // string
            if (value == "所有权限") {
              setDataSource(
                getAllPermissions(props.manifest?.uses_permissions ?? [])
              );
            } else if (value == "高危权限") {
              setDataSource(
                getDangerousPermission(props.manifest?.uses_permissions ?? [])
              );
            } else if (value == "普通权限") {
              setDataSource(
                getNormalPermission(props.manifest?.uses_permissions ?? [])
              );
            } else if (value == "私有权限") {
              setDataSource(
                getPrivatePermission(props.manifest?.uses_permissions ?? [])
              );
            }
          }}
        />
        <Table
          className="mt-6 text-sm"
          // scroll={{ x: "max-content", y: 380 }}
          pagination={{
            pageSize: PAGE_SIZE,
            responsive: true,
          }}
          dataSource={dataSource}
          columns={columns}
          size="small"
        />
      </div>
    </div>
  );
}

export default PermissionInformation;
