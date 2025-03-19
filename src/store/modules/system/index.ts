import { defineStore } from "pinia";
import { computed } from "vue";

interface SystemInfo {
    safeAreaInsetsRpx: UniApp.SafeAreaInsets;
    statusBarHeight: number;
    titleBarHeight: number;
    navbarHeight: number;
    menuButtonWidth: number;
    menuButtonLeft: number;
}

export const useSystemStore = defineStore("system", () => {
    let SYSTEM: UniApp.GetSystemInfoResult; // 设备信息

    // #ifdef MP-WEIXIN
    let MENU_BUTTON: UniApp.GetMenuButtonBoundingClientRectRes; // 胶囊按钮位置信息
    // #endif

    let statusBarHeight: number; // 状态栏高度
    let titleBarHeight: number; // 标题栏高度
    let navbarHeight: number; // 导航栏总高度 = 标题栏高度 + 状态栏高度
    let menuButtonWidth: number; // 胶囊按钮的宽度 + 胶囊按钮与右边的距离
    let menuButtonLeft: number; // 胶囊按钮距离屏幕左边的距离 可以给navbar的titleBox宽度设置menuButtonLeft   确保标题绝对不会和胶囊按钮相交

    let safeAreaInsets: UniApp.SafeAreaInsets; // 四个方向的安全距离<px> {top,bottom,......}
    let safeAreaInsetsRpx: UniApp.SafeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 }; // 四个方向的安全距离<rpx> {top,bottom,......}
    // 获取当前设备的信息
    const setSystemApi = () => {
        SYSTEM = uni.getSystemInfoSync();
        statusBarHeight = SYSTEM.statusBarHeight || 0; // 状态栏高度
        let titleTextHeight = 35; // 标题栏文字高度
        let titlePaddingHeight = 5; // 标题栏边距高度<这里是一个边距>
        // #ifdef  MP-WEIXIN
        MENU_BUTTON = uni.getMenuButtonBoundingClientRect(); // 胶囊按钮位置信息
        let { top, height } = MENU_BUTTON; // top 胶囊按钮top与顶部的距离
        titleTextHeight = height; // 小程序中文字高度等于胶囊按钮高度
        titlePaddingHeight = top - statusBarHeight; // 小程序中边距等于胶囊按钮距离顶部距离 - 状态栏高度
        menuButtonWidth = SYSTEM.screenWidth - MENU_BUTTON.left;
        menuButtonLeft = MENU_BUTTON.left;
        // #endif
        titleBarHeight = titleTextHeight + titlePaddingHeight * 2; // top - statusBarHeight： 上边距<胶囊按钮的高度加  2个胶囊按钮的上边距>
        navbarHeight = titleBarHeight + statusBarHeight; // navBar的总高度

        // 获取四个方向的安全距离 并转为rpx
        console.log("uni.getSystemInfoSync()", uni.getSystemInfoSync());
        safeAreaInsets = {
            left: SYSTEM.safeAreaInsets?.left || 0,
            right: SYSTEM.safeAreaInsets?.right || 0,
            bottom: SYSTEM.safeAreaInsets?.bottom || 0,
            top: SYSTEM.safeAreaInsets?.top || 0,
        };

        safeAreaInsetsRpx = safeAreaInsets;
        for (const key in safeAreaInsets) {
            safeAreaInsetsRpx[key as keyof typeof safeAreaInsetsRpx] = pxToRpx(
                safeAreaInsets[key as keyof typeof safeAreaInsets]
            );
        }
    };
    const system = computed(() => {
        if (!navbarHeight) {
            setSystemApi();
        }
        return {
            safeAreaInsetsRpx,
            statusBarHeight,
            titleBarHeight,
            navbarHeight,
            menuButtonWidth,
            menuButtonLeft,
        };
    });
    // px转rpx
    const pxToRpx = (px: number) => {
        const screenWidth = SYSTEM.screenWidth; // 屏幕宽度
        return (750 * Number.parseInt(px.toString())) / screenWidth;
    };

    return { setSystemApi, pxToRpx, safeAreaInsetsRpx, system };
});
