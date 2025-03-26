<script lang="ts" setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useSetupStore } from "@/store";
/**
 * 引入这个是为了一些在页面中调用的封装函数中 可以使用setup中的函数
 * <如接口封装 中要使用的toast必须要在setup环境中使用>
 * 要把函数放到这个store中 通过store调用
 */
const setupStore = useSetupStore();
const page = ref(getCurrentPages()[0].route);
const activeIndex = ref();

onShow(async () => {
    uni.hideTabBar();
    if (page.value === "pages/home/home") activeIndex.value = 0;
    if (page.value === "pages/message/message") activeIndex.value = 1;
    if (page.value === "pages/shopping-cart/shopping-cart") activeIndex.value = 2;
    if (page.value === "pages/my/my") activeIndex.value = 3;
});

function changeTab(_: any, index: number | string) {
    if (index === 0) {
        uni.switchTab({
            url: "/pages/home/home",
        });
    } else if (index === 1) {
        uni.switchTab({
            url: "/pages/message/message",
        });
    } else if (index === 2) {
        uni.switchTab({
            url: "/pages/shopping-cart/shopping-cart",
        });
    } else if (index === 3) {
        uni.switchTab({
            url: "/pages/my/my",
        });
    }
}
</script>

<template>
    <div>
        <nut-toast></nut-toast>
        <slot />
        <!-- 支付宝小程序自定义 tabbar需要特殊处理 -->
        <nut-tabbar
            v-model="activeIndex"
            active-color="#000"
            unactive-color="#000"
            safe-area-inset-bottom
            bottom
            placeholder
            @tab-switch="changeTab"
        >
            <nut-tabbar-item tab-title="首页">
                <template #icon="props">
                    <image class="size-38" v-if="props.active" src="@/static/tabbar/1-1.png" />
                    <image class="size-38" v-else src="@/static/tabbar/1-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="消息">
                <template #icon="props">
                    <image class="size-38" v-if="props.active" src="@/static/tabbar/2-1.png" />
                    <image class="size-38" v-else src="@/static/tabbar/2-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="购物车" :value="55">
                <template #icon="props">
                    <image class="size-38" v-if="props.active" src="@/static/tabbar/3-1.png" />
                    <image class="size-38" v-else src="@/static/tabbar/3-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="我的">
                <template #icon="props">
                    <image class="size-38" v-if="props.active" src="@/static/tabbar/4-1.png" />
                    <image class="size-38" v-else src="@/static/tabbar/4-0.png" />
                </template>
            </nut-tabbar-item>
        </nut-tabbar>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-tabbar) {
    background: linear-gradient(180deg, #f9fdff 0%, #ffedc2 100%) !important;
}
</style>
