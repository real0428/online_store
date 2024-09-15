import './assets/scss/main.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import registerGlobalComponent from './plugins/regisiterGlobalCompoennt'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'
console.log(import.meta.env);

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(fas, fab, far)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('QuillEditor', QuillEditor)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
registerGlobalComponent(app)

app.mount('#app')
