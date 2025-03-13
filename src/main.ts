import { createSSRApp } from "vue";
import App from "./App.vue";
import '@/styles/reset.css'
import 'uno.css'
import 'virtual:unocss-devtools'
import { setupStore } from '@/store'
export function createApp() {
  const app = createSSRApp(App);
  setupStore(app)
  return {
    app,
  };
}
