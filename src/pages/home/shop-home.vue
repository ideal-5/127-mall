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
        title: "价格(降序)",
        key: "life",
    },
    {
        title: "价格(升序)",
        key: "123",
    },
]);
const activeTabs = ref("all");

const showMore = ref(false); // 是否显示更多气泡

const searchValue = ref(""); // 搜索框值

const showSearxhInp = ref(false); // 是否显示搜索框 && 是否聚焦

const tapSearch = () => {
    uni.showToast({
        title: searchValue.value,
        icon: "none",
    });
};
</script>

<template>
    <div class="main h100vh flex flex-col" @touchstart="showMore = false">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center justify-between box-border pr-30">
                    <div class="flex-center flex-1 min-w-0">
                        <!-- 店铺 -->
                        <div class="flex-center wfull hfull">
                            <nut-transition
                                :show="!showSearxhInp"
                                name="fade-left"
                                :duration="200"
                                customClass="wfull hfull flex-center"
                                timingFunction="linear"
                            >
                                <image
                                    class="size-82 b-rd-10 mr16 flex-shrink-0"
                                    src="https://picsum.photos/id/237/200/300"
                                    mode="aspectFill"
                                />
                                <div class="font-500 text-28 flex-1 min-w-0 truncate">Moon橘子店</div>
                            </nut-transition>
                            <nut-transition
                                :show="showSearxhInp"
                                name="fade-right"
                                :duration="200"
                                customClass="wfull hfull flex-center"
                                timingFunction="linear"
                            >
                                <nut-searchbar
                                    v-model="searchValue"
                                    @blur="showSearxhInp = !showSearxhInp"
                                    :autofocus="showSearxhInp"
                                    style="
                                        --nut-searchbar-input-height: 70rpx;
                                        --nut-searchbar-input-border-radius: 14rpx;
                                        --nut-searchbar-padding: 0;
                                        --nut-searchbar-background: transparent;
                                        --nut-searchbar-input-background: rgba(255, 255, 255, 0.5);
                                    "
                                    @search="tapSearch"
                                >
                                    <template #leftin>
                                        <div class="size-40 flex-center">
                                            <span class="i-mdi:magnify text-#000 size-40"></span>
                                        </div>
                                    </template>
                                    <template #rightout>
                                        <div class="wfull hfull flex-center" @click.stop="tapSearch">搜索</div>
                                    </template>
                                </nut-searchbar>
                            </nut-transition>
                        </div>
                    </div>
                    <div
                        class="hfull flex-center flex-shrink-0 ml-20"
                        :style="{ width: showSearxhInp ? '70rpx' : '110rpx' }"
                    >
                        <nut-transition
                            :show="!showSearxhInp"
                            name="fade-right"
                            :duration="200"
                            customClass="size-40"
                            timingFunction="linear"
                        >
                            <span
                                class="i-mdi:magnify text-#000 size-40"
                                @click="showSearxhInp = !showSearxhInp"
                            ></span>
                        </nut-transition>

                        <div class="relative">
                            <span
                                class="i-mdi:dots-horizontal text-#000 size-40 ml30"
                                @click="showMore = !showMore"
                            ></span>
                            <nut-transition :show="showMore" name="zoom" :duration="200">
                                <div
                                    class="bg-#fff absolute top-100% right-30% text-28 b-rd-8 b-rd-tr-0 box-border px15"
                                    @touchstart.stop
                                >
                                    <div class="box-border py15 px20 b-b-solid b-b-1 b-b-#EFEFEF flex truncate">
                                        <span class="i-mdi:cart-minus size-38 mr10"></span>
                                        <span>购物车</span>
                                    </div>
                                    <div class="box-border py15 px20 b-b-solid b-b-1 b-b-#EFEFEF flex truncate">
                                        <span class="i-icon-park-outline:transaction-order size-38 mr10"></span>
                                        <span>我的订单</span>
                                    </div>
                                    <div class="box-border py15 px20 flex truncate">
                                        <span class="i-ri:customer-service-line size-38 mr10"></span>
                                        <span>客服</span>
                                    </div>
                                </div>
                            </nut-transition>
                        </div>
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
                    <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                    <image :src="item" mode="aspectFill" class="wfull hfull" />
                </nut-swiper-item>
            </nut-swiper>
        </div>

        <div class="wfull flex-1 min-h-0 bg-#fff mt--94 b-rd-t-20 z-10 box-border px32 flex flex-col">
            <div class="wfull h70 flex items-center flex-shrink-0">
                <div
                    class="text-26 mr40"
                    :class="activeTabs === item.key ? 'text-#EC3013' : 'text-#AEAEAE'"
                    v-for="(item, index) in tabList"
                    :key="index"
                    @click="activeTabs = item.key"
                >
                    {{ item.title }}
                </div>
                <!-- <div class="flex flex-col">
                    <span class="i-tabler:triangle-filled text-12"></span>
                    <span class="i-tabler:triangle-inverted-filled text-12"></span>
                    <span class="i-tabler:triangle text-12"></span>
                    <span class="i-tabler:triangle-inverted text-12"></span>
                </div>  -->
            </div>
            <div class="flex-1 min-h-0 wfull flex flex-wrap justify-between overflow-scroll">
                <div v-for="(item, index) in 9" :key="index" :id="index" class="w-326 mb-[24px]">
                    <div class="w-full h-342 overflow-hidden flex">
                        <image src="https://picsum.photos/200/300" mode="aspectFill" class="w-full hfull" />
                    </div>
                    <div class="bg-#fff b-rd-b-16 box-border p-16">
                        <div class="text-24">我是商品</div>
                        <div>
                            <span class="font-500 text-18">￥</span>
                            <span class="text-24 font-700">100.00</span>
                        </div>
                        <div class="flex items-center">
                            <div class="flex items-center border-1 border-#000 border-solid">
                                <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                <span class="text-12 mx-10">省20.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-swiper-pagination) {
    bottom: 120rpx;
}
</style>
