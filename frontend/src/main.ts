import { createApp } from "vue";
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoLocationSharp } from "oh-vue-icons/icons";

addIcons(IoLocationSharp);

import "./index.css";
import "../node_modules/leaflet/dist/leaflet.css";
import App from "./App.vue";

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(router);
app.mount("#app");
