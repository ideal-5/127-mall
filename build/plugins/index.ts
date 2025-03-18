import type { PluginOption } from "vite";
import { resolve } from "node:path";
import uni from "@dcloudio/vite-plugin-uni";
// import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
// import uniManifest from '@uni-helper/vite-plugin-uni-manifest'
import uniPages from "@uni-helper/vite-plugin-uni-pages";
import uniPolyfill from "vite-plugin-uni-polyfill";
import { getRootPath } from "../utils";
import unplugins from "./unplugin";

export async function setupVitePlugins(): Promise<PluginOption[]> {
    const unocss = (await import("unocss/vite")).default;
    const plugins = [
        // uniManifest({ minify: true }), // ts编写的manifest.json文件 参数标明是否压缩
        uniPages({
            // uni pages配置文件
            mergePages: true, // 是否合并pages配置文件
            minify: true, // 是否压缩pages配置文件
            dts: resolve(getRootPath(), "typings/uni-pages.d.ts"), // 生成pages.d.ts文件
            exclude: ["**/components/**/*.vue"], // 排除的pages文件
        }),
        // uniLayouts(),
        ...unplugins,
        uniPolyfill(), // polyfill vue版本的补丁
        unocss(),
        uni({
            vueOptions: {},
        }),
    ];
    return plugins;
}
