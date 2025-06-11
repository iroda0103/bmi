import './assets/main.css'
import './assets/base.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
// import 'prismjs/components/prism-html'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

const app = createApp(App);
app.use({
    install(app) {
        AOS.init({
            // Sozlamalar
            duration: 800,
            easing: 'ease-in-out',
            once: false
        })
    }
});
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app')
