<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import { useSystemStore } from "@/store";

interface Props {
    barColor: string;
    isFill: boolean;
    isTimeFill: boolean;
    backColor: string;
    scrollTop: number;
    scrollText: boolean;
    isStopBack: boolean;
    isBackIconFill: boolean;
}

const {
    // 背景颜色
    barColor = "transparent",
    // 是否需要填充
    isFill = true,
    // 是否只需要状态栏<时间>填充
    isTimeFill = false,
    // 返回按钮颜色
    backColor = "#000",
    // 滚动条距离顶部的距离<如果不传 默认是-1  如果值是-1 就说明没有传值>
    // import { onPageScroll } from "@dcloudio/uni-app";
    // const scrollTop = ref(0);
    // onPageScroll((e) => {
    //     scrollTop.value = e.scrollTop;
    // });
    scrollTop = -1,
    // 是否根据滚动改变文字透明度<默认和left插槽都会生效>
    scrollText = false,
    // 点击返回按钮是否阻止返回上一页面
    isStopBack = false,
    // 使用left具名插槽时 返回按钮是否占据位置
    isBackIconFill = false,
} = defineProps<Props>();
const emit = defineEmits(["tapBackIcon"]);

const systemStore = useSystemStore();
const systemInfo = ref();
systemInfo.value = systemStore.getSystem();

const goBacksPage = () => {
    emit("tapBackIcon");
    if (!isStopBack) {
        uni.navigateBack({
            delta: 1,
        });
    }
};
const isGoBack = () => {
    const pages = getCurrentPages();
    // 如果页面栈长度大于1，表示有上一页可以返回
    // console.log("页面栈", pages);
    return pages.length > 1;
};

/**
 * 背景色
 */

// 计算背景颜色
const background = computed(() => {
    let color = barColor;
    if (scrollTop >= 0 && color === "transparent") {
        color = "#fff"; // 透明背景时替换成白色
    }
    return color;
});

// 计算透明度，避免每次通过 computed 计算
const opacity = computed(() => {
    return scrollTop >= 0 ? Math.min(scrollTop / systemInfo.value.navbarHeight, 1) : 1;
});
</script>

<template>
    <div class="layout">
        <div class="navbar">
            <!-- 背景 -->
            <div class="navbar-bj" :style="{ opacity, background }"></div>

            <!-- 状态栏<时间> -->
            <div class="statusBar" :style="{ height: systemInfo.statusBarHeight + 'px' }"></div>
            <!-- 标题栏<标题> -->
            <div v-if="!isTimeFill" class="titleBar" :style="{ height: systemInfo.titleBarHeight + 'px' }">
                <!-- 居中的插槽，两边都有胶囊的占位盒子  -->
                <!-- #ifdef MP-WEIXIN -->
                <div :style="{ width: systemInfo.menuButtonWidth + 'px' }"></div>
                <div class="title" :style="{ opacity: scrollText ? opacity : 1 }">
                    <slot></slot>
                </div>
                <div :style="{ width: systemInfo.menuButtonWidth + 'px' }"></div>
                <!-- #endif  -->
                <!-- app居中插槽 -->
                <!-- #ifndef MP-WEIXIN -->
                <div class="title" :style="{ opacity: scrollText ? opacity : 1 }">
                    <slot></slot>
                </div>
                <!-- #endif -->

                <!-- 减去右边胶囊按钮位置的插槽   -->
                <!-- #ifdef MP-WEIXIN -->
                <div class="let-slot-box" :style="{ maxWidth: systemInfo.menuButtonLeft + 'px' }">
                    <div
                        v-if="isGoBack()"
                        @click="goBacksPage"
                        class="back-icon"
                        :style="{ position: isBackIconFill ? 'initial' : 'absolute' }"
                    >
                        <up-icon name="arrow-leftward" :color="backColor" size="20"></up-icon>
                    </div>
                    <slot name="left" :style="{ opacity: scrollText ? opacity : 1 }"></slot>
                </div>
                <!-- #endif  -->

                <!-- app不居中插槽 -->
                <!-- #ifndef MP-WEIXIN -->
                <div class="let-slot-box" :style="{ maxWidth: '100vw' }">
                    <div
                        v-if="isGoBack()"
                        @click="goBacksPage"
                        class="back-icon"
                        :style="{ position: isBackIconFill ? 'initial' : 'absolute' }"
                    >
                        <up-icon name="arrow-leftward" :color="backColor" size="20"></up-icon>
                    </div>
                    <slot name="left" :style="{ opacity: scrollText ? opacity : 1 }"></slot>
                </div>
                <!-- #endif -->
            </div>
        </div>
        <div
            v-if="isFill"
            class="fill"
            :style="{ height: (isTimeFill ? systemInfo.statusBarHeight : systemInfo.navbarHeight) + 'px' }"
        >
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
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
        }

        .statusBar {
        }
        .titleBar {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
            .title {
                font-size: 40rpx;
                font-weight: 900;
                flex: 1;
                @include text-omit;
                text-align: center;
            }

            .let-slot-box {
                position: absolute;
                left: 0rpx;
                height: 100%;
                display: flex;
                align-items: center;
                min-width: 100rpx;
                @include text-omit;
                .back-icon {
                    width: 70rpx;
                    z-index: 2;
                    @include my-flex;
                }
            }
        }
    }
    .fill {
    }
}
</style>
