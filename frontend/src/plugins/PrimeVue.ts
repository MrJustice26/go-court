import PrimeVue from 'primevue/config';
import '@/assets/theme.css';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const initPrimeVue = (app: any) => {
    app.use(PrimeVue);

    app.component("Dialog", Dialog)
    app.component("InputText", InputText)
    app.component("Textarea", Textarea)
}

export default initPrimeVue;