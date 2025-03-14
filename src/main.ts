import { createSSRApp } from "vue";
import App from "./App.vue";
import '@/styles/reset.css'
import 'uno.css'
import 'virtual:unocss-devtools'
import { setupStore } from '@/store'
import NavBar from '@/components/NavBar.vue'
export function createApp() {
  const app = createSSRApp(App);
  setupStore(app)
  app.component('NavBar', NavBar)
  return {
    app,
  };
}
