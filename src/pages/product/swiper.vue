<script setup lang="ts">
import { ref } from "vue";
const swiperList = ref([
    `https://picsum.photos/700/350?random=${1}`,
    `https://picsum.photos/700/750?random=${2}`,
    `https://picsum.photos/700/1050?random=${3}`,
    `https://picsum.photos/700/850?random=${4}`,
    `https://picsum.photos/700/1550?random=${5}`,
]);
const current = ref(1); // 当前页码

const swiperChange = (index:number) => {
    current.value = index + 1;
};
</script>

<template>
    <div class="main h100vh flex-col">
        <NavBar barColor="#000" backColor="#fff"> </NavBar>

        <div class="flex-1 min-h-0 bg-#000 flex-col">
            <div class="wfull h100 flex-shrink-0 flex items-center justify-end box-border px40">
                <div class="text-26 text-#949494">
                    <span>{{ current }}/{{ swiperList.length }}</span>
                </div>
            </div>
            <div class="flex-1 min-h-0 wfull">
                <nut-swiper :init-page="1" class="w-full hfull" @change="swiperChange">
                    <nut-swiper-item v-for="(item, index) in swiperList" :key="index" class="wfull hfull flex-center">
                        <image :src="item" mode="widthFix" class="wfull h-fit max-h-full" />
                    </nut-swiper-item>
                </nut-swiper>
            </div>
            <div class="wfull h100 flex-shrink-0"></div>
        </div>

        <div class="wfull h110 bg-#2E2E2E flex-shrink-0 flex items-center justify-between box-border px30">
            <div text-white>
                <span text-30>￥</span>
                <span text-46>12.90</span>
            </div>
            <div class="flex h72">
                <div class="hfull text-24 bg-#FFF b-rd-l-full flex-center box-content px40">
                    <span i-mdi:cart-minus></span>
                </div>
                <div
                    class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-r-full box-border px50"
                >
                    <span class="fw500 text-30">￥12.90</span>
                    <span class="text-20">立即购买</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
