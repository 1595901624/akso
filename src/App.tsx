import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import HomeEmptyComponent from "./component/HomeEmptyComponent";
import { Manifest } from "./model/manifest";
import AppInformation from "./component/AppInformation";
import { FileInfo } from "./model/file_info";
import HeaderComponent from "./component/HeaderComponent.tsx";

function App() {
  const [filePath, setFilePath] = useState<string>();
  const [manifest, setManifest] = useState<Manifest>();
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  return (
    <div className="absolute flex flex-col h-full w-full">
      <div
        className={`position-absolute fixed w-full ${
          manifest != undefined ? "visible" : "hidden"
        }`}
      >
        <HeaderComponent apkPath={filePath} />
      </div>

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
                console.log(res);
                setManifest(res as Manifest);
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

      <div
        className="flex flex-col flex-1 mt-20"
        style={{
          display: manifest != undefined ? "flex" : "none",
        }}
      >
        <AppInformation manifest={manifest} fileInfo={fileInfo} />
      </div>

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
