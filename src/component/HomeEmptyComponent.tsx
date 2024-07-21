import {FileResponse, open} from "@tauri-apps/plugin-dialog";
import {useEffect} from "react";
import {UnlistenFn, listen} from '@tauri-apps/api/event';
import {EVENT_OPEN_FILE} from "../event/menu_event.ts";

type HomeEmptyComponentProps = {
    onPrepareOpenDialog?: () => void;
    onSelectFile?: (file: FileResponse) => void;
};

function HomeEmptyComponent(props: HomeEmptyComponentProps) {
    useEffect(() => {
        let unlisten: void | UnlistenFn;
        listen<string>(EVENT_OPEN_FILE, async () => {
            await openDialog();
        })
            .then((res) => {
                unlisten = res;
            })
        return () => {
            unlisten?.();
        };
    }, [])

    const openDialog = async () => {
        const file: FileResponse | null = await open({
            multiple: false,
            directory: false,
            title: "选择一个 APK 文件",
            filters: [{name: "APK", extensions: ["apk", "apk.1"]}],
        });
        if (file == null) {
            return;
        }
        props.onPrepareOpenDialog?.();
        props.onSelectFile?.(file);
        console.log(file);
    }

    return (
        <div
            className="absolute flex flex-col justify-center items-center h-full w-full"
            onClick={async () => {
                await openDialog();
            }}
        >
            <p>选择一个 APK 文件</p>
        </div>
    );
}

export default HomeEmptyComponent;
