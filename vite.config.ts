import { defineConfig } from "vite";
import UniComponents from "@uni-helper/vite-plugin-uni-components";
import { NutResolver } from "nutui-uniapp";
import { setupVitePlugins } from './build/plugins'
// import UnoCSS from "unocss/vite";

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default
    return defineConfig({
        plugins: [
            // 确保放在 `UniApp()` 之前
            UniComponents({
                resolvers: [NutResolver()],
            }),
            ...await setupVitePlugins(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                    additionalData: `@import '@/styles/variables.scss';`,
                },
            },
        },
    });
};
