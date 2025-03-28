<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import type { Product } from "@/api";

const swiperList = ref<Product.Banner[]>();
const startIndex = ref(0);
const currentPage = ref(1);
const productInfo = ref<Product.Product>();

onMounted(() => {
    const instance = getCurrentInstance();
    if (instance?.proxy) {
        const eventChannel = instance.proxy.getOpenerEventChannel();
        if (eventChannel) {
            eventChannel.on(
                "sendBanner",
                ({
                    list,
                    index,
                    productInfo: info,
                }: {
                    list: Product.Banner[];
                    index: number;
                    productInfo: Product.Product;
                }) => {
                    swiperList.value = list;
                    startIndex.value = index;
                    currentPage.value = index + 1;
                    productInfo.value = info;
                }
            );
        }
    }
});

const swiperChange = (index: number) => {
    currentPage.value = index + 1;
};
</script>

<template>
    <div class="main h100vh flex-col">
        <NavBar barColor="#000" backColor="#fff"> </NavBar>

        <div class="flex-1 min-h-0 bg-#000 flex-col">
            <div class="wfull h100 flex-shrink-0 flex items-center justify-end box-border px40">
                <div class="text-26 text-#949494">
                    <span>{{ currentPage }}/{{ swiperList?.length }}</span>
                </div>
            </div>
            <div class="flex-1 min-h-0 wfull">
                <nut-swiper :init-page="startIndex" class="w-full hfull" @change="swiperChange">
                    <nut-swiper-item v-for="(item, index) in swiperList" :key="index" class="wfull hfull flex-center">
                        <image :src="item.imageUrl" mode="widthFix" class="wfull h-fit max-h-full" />
                    </nut-swiper-item>
                </nut-swiper>
            </div>
            <div class="wfull h100 flex-shrink-0"></div>
        </div>

        <div class="wfull h110 bg-#2E2E2E flex-shrink-0 flex items-center justify-between box-border px30">
            <div text-white>
                <span text-30>￥</span>
                <span text-46>{{ productInfo?.currentPrice }}</span>
            </div>
            <div class="flex h72">
                <div class="hfull text-24 bg-#FFF b-rd-l-full flex-center box-content px40">
                    <span i-mdi:cart-minus></span>
                </div>
                <div
                    class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-r-full box-border px50"
                >
                    <span class="fw500 text-30">￥{{ productInfo?.currentPrice }}</span>
                    <span class="text-20">立即购买</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
