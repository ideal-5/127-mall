import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/styles/reset.css";
import "uno.css";
import "virtual:unocss-devtools";
import { setupStore } from "@/store";
import NavBar from "@/components/NavBar.vue";
import Tabs from "@/components/Tabs.vue";
export function createApp() {
    const app = createSSRApp(App);
    setupStore(app);
    app.component("NavBar", NavBar);
    app.component("Tabs", Tabs);
    return {
        app,
    };
}
