import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import HomeEmptyComponent from "./component/HomeEmptyComponent";
import { Manifest } from "./model/manifest";

function App() {
  const [manifest, setManifest] = useState<Manifest>();

  return (
    <div className="container">
      <HomeEmptyComponent
        onSelectFile={(file) => {
          const file_path = file.path;
          invoke("get_app_manifest", { apk_path: file_path })
            .then((res) => {
                console.log(res)
                setManifest(res as Manifest);
            })
            .catch((err) => console.log(err));
        }}
      />

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
