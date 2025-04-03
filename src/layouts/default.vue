<script lang="ts" setup>
import { ref } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useUserStore, useShopCartStore } from "@/store";

const userStore = useUserStore();

/**
 * 购物车
 */
const shopCartStore = useShopCartStore();
onLoad(() => {
    shopCartStore.getShopCartList();
});

/**
 * 处理tabbar
 */
const isTabbar = ref(false);
const tabMap = {
    "pages/home/home": 0,
    "pages/message/message": 1,
    "pages/shopping-cart/shopping-cart": 2,
    "pages/my/my": 3,
} as const;
const activeIndex = ref<number | undefined>();
onShow(() => {
    uni.hideTabBar({
        success: () => {
            isTabbar.value = true;
        },
        fail: () => {
            isTabbar.value = false;
        },
    });
    const currentPage = getCurrentPages().pop()?.route;
    if (currentPage && currentPage in tabMap) {
        activeIndex.value = tabMap[currentPage as keyof typeof tabMap];
    }
});
function changeTab(_: any, index: number | string) {
    const paths = Object.keys(tabMap);
    if (paths[Number(index)]) {
        uni.switchTab({ url: `/${paths[Number(index)]}` });
    }
}

/**
 * 处理应用必须接口<没有这些接口数据就不展示页面>
 */
</script>

<template>
    <div style="--global-tabbar-height: 50px;" >
        <nut-toast :z-index="99999"></nut-toast>
        <slot />
        <nut-tabbar
            v-model="activeIndex"
            active-color="#000"
            unactive-color="#000"
            safe-area-inset-bottom
            bottom
            placeholder
            @tab-switch="changeTab"
            v-if="isTabbar"
            style="--nut-tabbar-height: var(--global-tabbar-height)"
        >
            <nut-tabbar-item
                v-for="(path, idx) in Object.keys(tabMap)"
                :key="idx"
                :tab-title="['首页', '消息', '购物车', '我的'][idx]"
                :value="idx === 2 ? shopCartStore.total : ''"
            >
                <template #icon="props">
                    <image class="size-38" v-if="props.active" :src="`/static/tabbar/${idx + 1}-1.png`" />
                    <image class="size-38" v-else :src="`/static/tabbar/${idx + 1}-0.png`" />
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
