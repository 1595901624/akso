export interface Manifest {
  package: Package;
  sdk_version: string;
  target_sdk_version: string;
  uses_permissions: string[];
  application_labels: { [key: string]: string };
  application_icons: { [key: string]: string };
  application: Application;
  launchable_activity: LaunchableActivity;
  native_code: string;
}

export interface Package {
  versionName: string;
  versionCode: number;
  name: string;
  platformBuildVersionName: string;
  platformBuildVersionCode: number;
  compileSdkVersion: string;
  compileSdkVersionCodename: string;
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
