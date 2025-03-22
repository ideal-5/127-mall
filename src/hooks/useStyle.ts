import { useSystemStore } from "@/store";

export function useStyle() {
    const systemStore = useSystemStore();
    const systemInfo = systemStore.system;

    // 粘性定位
    const sticky = (top?: "navBar" | "timeBar") => {
        let topValue = {
            navBar: systemInfo.navbarHeight + "px",
            timeBar: systemInfo.statusBarHeight + "px",
        };
        return {
            position: "sticky",
            top: top ? topValue[top] : "0px",
            "z-index": 10,
        };
    };

    // 定位到底部的区域
    const absoluteBottom = (height: number | string = 100) => {
        height = Number(height) + systemInfo.safeAreaInsetsRpx.bottom;
        console.log('systemInfo.safeAreaInsetsRpx.bottom', systemInfo.safeAreaInsetsRpx.bottom);
        console.log('height + "rpx"', height + "rpx");
        return {
            bottomHeightNum: height,
            bottomHeight: height + "rpx", // 总高
            bottomStyle: {
                width: "100%",
                height: height + "rpx",
                backgroundColor: "#fff",
                position: "fixed",
                bottom: "0",
                right: "0",
                boxSizing: "border-box",
                paddingBottom: systemInfo.safeAreaInsetsRpx.bottom + "rpx",
                zIndex: 5,
            },
        };
    };

    return { sticky, absoluteBottom };
}
