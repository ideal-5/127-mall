import { createPinia } from "pinia";
import type { App } from "vue";
import { createPersistedState } from "pinia-plugin-persistedstate"; // 数据持久化

export const pinia = createPinia();
pinia.use(
    createPersistedState({
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync,
        },
    })
);
export async function setupStore(app: App) {
    app.use(pinia);
}

export * from "./modules";
