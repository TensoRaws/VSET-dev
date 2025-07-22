import ElementPlus from 'element-plus'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'

import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(naive)

app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
