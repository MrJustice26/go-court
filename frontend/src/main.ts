import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";



import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.vue";
import { OhVueIcon } from "./vue-icons";

const pinia = createPinia();

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(pinia);
app.use(router);
app.mount("#app");
