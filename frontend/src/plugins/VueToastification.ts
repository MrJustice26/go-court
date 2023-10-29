import Toast, {PluginOptions} from "vue-toastification";
import "vue-toastification/dist/index.css";

const initVueToastificationPlugin = (app: any) => {
    const options: PluginOptions = {
        timeout: 3000,
    }

    app.use(Toast, options);
}

export default initVueToastificationPlugin

