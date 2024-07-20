import { FileResponse, open } from "@tauri-apps/plugin-dialog";

type HomeEmptyComponentProps = {
  onSelectFile?: (file: FileResponse) => void;
};

function HomeEmptyComponent(props: HomeEmptyComponentProps) {
  return (
    <div
      className="absolute flex flex-col justify-center items-center h-full w-full"
      onClick={async () => {
        const file: FileResponse | null = await open({
          multiple: false,
          directory: false,
          title: "选择一个 APK 文件",
          filters: [{ name: "APK", extensions: ["apk", "apk.1"] }],
        });
        if (file == null) {
          return;
        }
        props.onSelectFile?.(file);
        console.log(file);
      }}
    >
      <p>选择一个 APK 文件</p>
    </div>
  );
}

export default HomeEmptyComponent;
