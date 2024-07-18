import {open} from '@tauri-apps/plugin-dialog';


type HomeEmptyComponentProps = {
    onSelectFile: (file: string) => void;
}

function HomeEmptyComponent() {
    return (
        <div className="absolute flex flex-col justify-center items-center h-screen w-screen" onClick={async () => {
            const file = await open({
                multiple: false,
                directory: false,
                title: '选择一个 APK 文件',
                filters: [
                    {name: 'APK', extensions: ['apk']},
                ],
            });
            if (file == null) {
                return;
            }
            console.log(file);
        }}>
            <p>选择一个 APK 文件</p>
        </div>
    );
}

export default HomeEmptyComponent;
