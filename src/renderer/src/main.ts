import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 导入 Naive UI 推荐的字体
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
