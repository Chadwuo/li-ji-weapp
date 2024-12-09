import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './stores'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
