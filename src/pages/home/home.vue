<script setup lang="ts">
import { ref } from "vue";
import ProductModule from "./components/ProductModule/index.vue";
import Hot from "./components/Hot/index.vue";
import { onPageScroll } from "@dcloudio/uni-app";

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
    console.log("scrollTop.value", scrollTop.value);
});

const searchValue = ref<string>("");
const swiperList = ref([
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
]);
</script>

<template>
    <div class="main w-full min-h-100vh bg-gradient-to-l from-[#FFEDC4] to-[#FFDBB8] box-border px-34">
        <NavBar :scrollTop="scrollTop" barColor="#fff">
        <!-- <NavBar> -->
            <template #left>
                <div class="w-100vw box-border px-34">
                    <span class="text-34 font-800 mr-15">SHOP_APP_NAME</span>
                    <span class="text-24">海量商品用心精选</span>
                </div>
            </template>
        </NavBar>
        <nut-searchbar
            v-model="searchValue"
            style="--nut-searchbar-input-height: 37px; --nut-searchbar-input-border-radius: 9999rpx"
        >
            <template #rightin>
                <div
                    class="w-108 h-58 b-rd-full bg-gradient-to-r from-[#FECE62] to-[#FFAA48] flex items-center justify-center"
                >
                    <span class="text-28 text-#fff">搜索</span>
                </div>
            </template>
        </nut-searchbar>
        <!-- 轮播图 -->
        <nut-swiper
            :init-page="1"
            :pagination-visible="true"
            pagination-color="#426543"
            pagination-unselected-color="#808080"
            auto-play="3000"
            class="w-full h-344 b-rd-12 mt-22 mb-24"
        >
            <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                <img :src="item" alt="" mode="aspectFill" />
            </nut-swiper-item>
        </nut-swiper>
        <!-- <div style="width: 750rpx; height: 500rpx; background-color: aquamarine;" ></div> -->
        <!-- 商品模块 -->
        <ProductModule></ProductModule>
        <!-- 热门推荐 -->
        <Hot></Hot>
    </div>
</template>

<style scoped lang="scss">
.main {
    :deep(.nut-searchbar) {
        padding: 0;
        background-color: transparent;
    }
}
</style>
