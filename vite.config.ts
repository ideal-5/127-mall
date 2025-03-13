import type { ConfigEnv } from 'vite'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import UniComponents from "@uni-helper/vite-plugin-uni-components";
import { NutResolver } from "nutui-uniapp";
import { setupVitePlugins } from './build/plugins'
import { convertEnv } from './build/utils'
// import UnoCSS from "unocss/vite";

export default async (configEnv: ConfigEnv) => {
    return defineConfig({
        plugins: await setupVitePlugins(),
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
