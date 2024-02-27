import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化
import App from './App.vue'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  pinia.use(
    createPersistedState({
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    }),
  )
  app.use(pinia)
  return {
    app,
  }
}
