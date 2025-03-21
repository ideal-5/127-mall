<script lang="ts" setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const page = ref(getCurrentPages()[0].route);
const activeIndex = ref();

onShow(async () => {
    uni.hideTabBar();
    console.log("page.value", page.value);
    if (page.value === "pages/home/home") activeIndex.value = 0;
    if (page.value === "pages/message/message") activeIndex.value = 1;
    if (page.value === "pages/shopping-cart/shopping-cart") activeIndex.value = 2;
    if (page.value === "pages/my/my") activeIndex.value = 3;
});

function changeTab(_: any, index: number | string) {
    console.log("tabindex", index);

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
            @tab-switch="changeTab"
        >
            <nut-tabbar-item tab-title="首页">
                <template #icon="props">
                    <img class="size-38" v-if="props.active" src="@/static/tabbar/1-1.png" />
                    <img class="size-38" v-else src="@/static/tabbar/1-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="消息">
                <template #icon="props">
                    <img class="size-38" v-if="props.active" src="@/static/tabbar/2-1.png" />
                    <img class="size-38" v-else src="@/static/tabbar/2-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="购物车">
                <template #icon="props">
                    <img class="size-38" v-if="props.active" src="@/static/tabbar/3-1.png" />
                    <img class="size-38" v-else src="@/static/tabbar/3-0.png" />
                </template>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="我的">
                <template #icon="props">
                    <img class="size-38" v-if="props.active" src="@/static/tabbar/4-1.png" />
                    <img class="size-38" v-else src="@/static/tabbar/4-0.png" />
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
