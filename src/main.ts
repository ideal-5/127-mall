import { createSSRApp } from "vue";
import App from "./App.vue";
import '@/styles/reset.css'
import 'uno.css'
import 'virtual:unocss-devtools'
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
