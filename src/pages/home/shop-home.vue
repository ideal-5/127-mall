<script setup lang="ts">
import { ref } from "vue";

const swiperList = ref([
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
]);

const tabList = ref([
    {
        title: "综合",
        key: "all",
    },
    {
        title: "销量",
        key: "phone",
    },
    {
        title: "新品",
        key: "computer",
    },
    {
        title: "价格",
        key: "life",
        sortable: "1",
    },
]);
const activeTabs = ref({ key: "all", sortable: 0 });
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <span class="text-42 text-#fff mx-10">二手市场</span>
                    <div class="size-40 flex-center">
                        <span class="i-mdi:magnify text-#000 size-40"></span>
                    </div>
                </div>
            </template>
        </NavBar>
        <!-- 轮播图 -->
        <div class="z-1">
            <nut-swiper
                :init-page="1"
                :pagination-visible="true"
                pagination-color="#426543"
                pagination-unselected-color="#808080"
                auto-play="30000"
                class="w-full h-996"
            >
                <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                    <image :src="item" mode="aspectFill" class="wfull hfull" />
                </nut-swiper-item>
            </nut-swiper>
        </div>

        <div class="wfull flex-1 min-h-0 bg-fuchsia mt--94 b-rd-t-20 z-10">
            <div class="wfull flex items-center">
                <div
                    class="text-26 mr40"
                    :class="activeTabs.key === item.key ? 'text-#EC3013' : 'text-#AEAEAE'"
                    v-for="(item, index) in tabList"
                    :key="index"
                    @click="activeTabs.key = item.key"
                >
                    {{ item.title }}
                </div>
                <div class="flex flex-col">
                    <span class="i-tabler:triangle-filled text-12"></span>
                    <span class="i-tabler:triangle-inverted-filled text-12"></span>
                    <!-- <span class="i-tabler:triangle text-12"></span>
                    <span class="i-tabler:triangle-inverted text-12"></span> -->
                </div>
            </div>
        </div>
    </div>
</template>
<route lang="json">
{
    "layout": "anyLayout"
}
</route>

<style scoped lang="scss">
:deep(.nut-swiper-pagination) {
    bottom: 120rpx;
}
</style>
