import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

var app = createApp(App);
app.use(Antd).mount("#app");
