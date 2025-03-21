<script setup lang="ts">
import { useSystemStore } from "@/store";
import { computed, defineProps, ref, useSlots } from "vue";

interface Props {
    barColor?: string;
    isEmptyFill?: boolean;
    isTimeFill?: boolean;
    backColor?: string;
    scrollTop?: number;
    scrollText?: boolean;
    isStopBack?: boolean;
    isBackIconFill?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    barColor: "transparent",
    // 是否需要取消填充
    isEmptyFill: false,
    // 是否只需要状态栏<时间>填充
    isTimeFill: false,
    // 返回按钮颜色
    backColor: "#000",
    // 滚动条距离顶部的距离<如果不传 默认是-1  如果值是-1 就说明没有传值>
    // import { onPageScroll } from "@dcloudio/uni-app";
    // const scrollTop : ref(0);
    // onPageScroll((e) :> {
    //     scrollTop.value : e.scrollTop;
    // });
    scrollTop: -1,
    // 是否根据滚动改变文字透明度<默认和left插槽都会生效>
    scrollText: false,
    // 点击返回按钮是否阻止返回上一页面
    isStopBack: false,
    // 使用left具名插槽时 返回按钮是否占据位置
    isBackIconFill: false,
});
const emit = defineEmits(["tapBackIcon"]);

const slots = useSlots();

const systemStore = useSystemStore();
const systemInfo = ref();
systemInfo.value = systemStore.system;

function goBacksPage() {
    emit("tapBackIcon");
    if (!props.isStopBack) {
        uni.navigateBack({
            delta: 1,
        });
    }
}
function isGoBack() {
    const pages = getCurrentPages();
    // 如果页面栈长度大于1，表示有上一页可以返回
    // console.log("页面栈", pages);
    return pages.length > 1;
}

/**
 * 背景色
 */

// 计算背景颜色
const background = computed(() => {
    let color = props.barColor;
    if (props.scrollTop >= 0 && color === "transparent") {
        color = "#fff"; // 透明背景时替换成白色
    }
    return color;
});

// 计算透明度，避免每次通过 computed 计算
const opacity = computed(() => {
    return props.scrollTop >= 0 ? Math.min(props.scrollTop / systemInfo.value.navbarHeight, 1) : 1;
});
</script>

<template>
    <div class="layout">
        <div class="navbar">
            <!-- 背景 -->
            <div class="navbar-bj" :style="{ opacity, background }" />

            <!-- 状态栏<时间> -->
            <div class="statusBar" :style="{ height: `${systemInfo.statusBarHeight}px` }" />

            <!-- 标题栏<标题> -->
            <div v-if="!props.isTimeFill" class="titleBar" :style="{ height: `${systemInfo.titleBarHeight}px` }">
                <!-- 返回按钮   -->
                <div
                    v-if="isGoBack()"
                    class="back-icon"
                    :style="{
                        position: props.isBackIconFill && systemInfo.menuButtonWidth === 0 ? 'initial' : 'absolute',
                    }"
                    @click="goBacksPage"
                >
                    <div :class="`i-mdi:chevron-left  text-${props.backColor} text-60`" />
                </div>
                <div
                    v-if="slots.default"
                    :style="{ width: `${systemInfo.menuButtonWidth}px` }"
                    class="hfull flex-shrink-0"
                />

                <div
                    class="hfull min-w0 flex-1"
                    :class="slots.default && `font-900 text-32   flex items-center  justify-center`"
                    :style="{ opacity: scrollText ? opacity : 1 }"
                >
                    <slot />
                    <slot name="left" />
                </div>

                <div :style="{ width: `${systemInfo.menuButtonWidth}px` }" class="hfull flex-shrink-0" />
            </div>
        </div>
        <!-- 填充 为了占位置 -->
        <div
            v-if="!props.isEmptyFill"
            class="fill"
            :style="{
                height: `${props.isTimeFill ? systemInfo.statusBarHeight : systemInfo.navbarHeight}px`,
            }"
        />
    </div>
</template>

<style scoped lang="scss">
.layout {
    --my-navbar-border-bottom-color: transparent; // 底部边框颜色
    .navbar {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;

        .navbar-bj {
            position: absolute;
            width: 100%;
            height: 100%;
            border-bottom: 1rpx solid var(--my-navbar-border-bottom-color);
        }
        .back-icon {
            width: 70rpx;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .statusBar {
        }
        .titleBar {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
        }
    }
    .fill {
    }
}
</style>
