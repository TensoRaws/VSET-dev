import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import i18n from './utils/i18n'

const app = createApp(App)
const pinia = createPinia()

// 添加持久化插件
pinia.use(createPersistedState({
  storage: localStorage,
  key: id => `vset-${id}`,
  auto: false // 手动控制哪些 store 需要持久化
}))

app.use(pinia)
app.use(i18n)
app.mount('#app')
