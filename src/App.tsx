import {useEffect, useState} from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import HomeEmptyComponent from "./component/HomeEmptyComponent";
import { Manifest } from "./model/manifest";
import AppInformation from "./component/AppInformation";
import {
  AlignLeftOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { FileInfo } from "./model/file_info";
import HeaderComponent from "./component/HeaderComponent.tsx";
import { Layout, Menu, message, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import PermissionInformation from "./component/PermissionInformation.tsx";

const labels = ["基本信息", "权限信息", "加固信息", "其它信息"];

const items = [
  AlignLeftOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
].map((icon, index) => ({
  key: String(index),
  icon: React.createElement(icon),
  label: labels[index],
}));

function App() {
  const [filePath, setFilePath] = useState<string>();
  const [manifest, setManifest] = useState<Manifest>();
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuKey, setSelectedMenuKey] = useState<string>("0");

  /**
   * 获取内容组件
   * @returns
   */
  const getContentLayout = () => {
    // if (selectedMenuKey == "0") {
    //   return (
    //       <AppInformation manifest={manifest} fileInfo={fileInfo} />
    //   );
    // }
    // return ;
    switch (selectedMenuKey) {
      case "0":
        return <AppInformation manifest={manifest} fileInfo={fileInfo} />;
      case "1":
        return <PermissionInformation manifest={manifest}/>;
      case "2":
        return <div>加固信息</div>;
      case "3":
        return <div>其它信息</div>;
    }
    return null;
  };

  return (
    <div className={`absolute flex flex-col h-full w-full`}>
      {/* <div
        className={`position-absolute fixed w-full ${
          manifest != undefined ? "visible" : "hidden"
        }`}
      >
        <HeaderComponent apkPath={filePath} />
      </div> */}

      <Layout className={`${manifest == undefined ? "hidden" : "visible"}`}>
        <Sider
          breakpoint="sm"
          collapsedWidth="1"
          width={140}
          collapsible={false}
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            className="h-full"
            theme="light"
            mode="inline"
            defaultSelectedKeys={["0"]}
            onSelect={(item) => {
              // message.info(item.key);
              setSelectedMenuKey(item.key);
            }}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <HeaderComponent apkPath={filePath} />
          </Header>
          <Content
            className="w-full mt-6"
            // style={{ margin: "24px 16px 0" }}
          >
            <div
              style={{
                height: "100%",
                // padding: 24,
                // minHeight: 360,
                background: colorBgContainer,
                // borderRadius: borderRadiusLG,
              }}
            >
              {getContentLayout()}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
        </Layout>
      </Layout>

      <div
        style={{
          display: manifest == undefined ? "flex" : "none",
        }}
      >
        <HomeEmptyComponent
          onPrepareOpenDialog={() => {
            setFileInfo(undefined);
          }}
          onSelectFile={(file) => {
            const file_path = file.path;
            setFilePath(file_path);
            // 获取apk信息
            invoke("get_app_manifest", { apk_path: file_path })
              .then((res) => {
                // console.log(res);
                const m = res as Manifest;
                setManifest(m);

                // unzip
                console.log("==============",m?.package?.name);
                if (m?.package?.name != undefined) {
                  invoke("unzip_apk", { apk_path: file_path, package_name: m?.package?.name })
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                }

              })
              .catch((err) => console.log(err));

            // 获取文件信息
            invoke("get_file_info", { apk_path: file_path })
              .then((res) => {
                console.log(res);
                const fileInfo = res as FileInfo;

                setFileInfo(fileInfo);
              })
              .catch((err) => console.log(err));
          }}
        />
      </div>

      {/* <div
        className="flex flex-col flex-1 mt-20"
        style={{
          display: manifest != undefined ? "flex" : "none",
        }}
      >
        <AppInformation manifest={manifest} fileInfo={fileInfo} />
      </div> */}

      {/* <h1 className="underline">Welcome to Tauri!</h1>

            <div className="row">
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo vite" alt="Vite logo"/>
                </a>
                <a href="https://tauri.app" target="_blank">
                    <img src="/tauri.svg" className="logo tauri" alt="Tauri logo"/>
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>

            <p>Click on the Tauri, Vite, and React logos to learn more.</p>

            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
                <button type="submit">Greet</button>
            </form>

            <p>{greetMsg}</p> */}
    </div>

    // <div className="container">
    //
    // </div>
  );
}

export default App;
