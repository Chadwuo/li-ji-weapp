import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupDayjs } from './plugins'
import store from './stores'
import 'virtual:uno.css'
import '@/style/index.scss'

setupDayjs()
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
