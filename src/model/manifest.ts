export interface Manifest {
    package: string;
    sdk_version: string;
    target_sdk_version: string;
    uses_permissions: string[];
    application_labels: { [key: string]: string };
    application_icons: { [key: string]: string };
    application: Application;
    launchable_activity: LaunchableActivity;
    native_code: string;
}

export interface Application {
    name: string;
    label: string;
    icon: string;
    theme: string;
}

export interface LaunchableActivity {
    name: string;
    label: string;
    icon: string;
}
