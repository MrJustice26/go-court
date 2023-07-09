import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoLocationSharp } from "oh-vue-icons/icons";

addIcons(IoLocationSharp);

import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.vue";

const pinia = createPinia();

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(pinia);
app.use(router);
app.mount("#app");
