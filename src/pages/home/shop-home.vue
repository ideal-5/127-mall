<script setup lang="ts">
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { shopDetailApi } from "@/api";
import type { Shop } from "@/api";
import { gotoPage } from "@/utils/uni";

const shopInfo = ref<Shop.ShopInfo>();
const merchList = ref<Shop.MerchList[]>();
const shopBannerList = ref<Shop.Banner[]>();

const activeTabs = ref<string>();
const tabList = ref([
    { title: "综合", key: "10" },
    { title: "销量", key: "20" },
    { title: "新品", key: "30" },
    { title: "价格(降序)", key: "40" },
    { title: "价格(升序)", key: "50" },
]);
watch(
    () => activeTabs.value,
    () => getList(false)
);

let shopId: number;
onLoad(async (query) => {
    if (!query) return;
    shopId = query.id as number;
    activeTabs.value = tabList.value[0].key;
});

const paging = {
    page: 1,
    limit: 10,
};
async function getList(isPush: boolean = false) {
    let { body } = await shopDetailApi({
        id: shopId,
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        orderBy: activeTabs.value || "10",
        merchName: searchValue.value,
    });
    shopInfo.value = body.shopInfo;
    shopBannerList.value = body.shopBannerList;
    if (isPush) {
        if (body.merchList.length === 0) return;
        paging.page++;
        merchList.value?.push(...body.merchList);
    } else {
        paging.page = 1;
        merchList.value = body.merchList;
    }
}

onReachBottom(() => getList(true));

const showMore = ref(false); // 是否显示更多气泡

const searchValue = ref(""); // 搜索框值

const showSearxhInp = ref(false); // 是否显示搜索框 && 是否聚焦
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
                                    :src="shopInfo?.shopLogo"
                                    mode="aspectFill"
                                />
                                <div class="font-500 text-28 flex-1 min-w-0 truncate">{{ shopInfo?.shopName }}</div>
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
                                    @search="getList(false)"
                                    @clear="getList(false)"
                                >
                                    <template #leftin>
                                        <div class="size-40 flex-center">
                                            <span class="i-mdi:magnify text-#000 size-40"></span>
                                        </div>
                                    </template>
                                    <template #rightout>
                                        <div class="wfull hfull flex-center" @click.stop="getList(false)">搜索</div>
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
                                    <div
                                        class="box-border py15 px20 b-b-solid b-b-1 b-b-#EFEFEF flex truncate"
                                        @click.stop="gotoPage('/pages/order/order-list')"
                                    >
                                        <span class="i-icon-park-outline:transaction-order size-38 mr10"></span>
                                        <span>我的订单</span>
                                    </div>
                                    <div
                                        class="box-border py15 px20 flex truncate"
                                        @click.stop="
                                            gotoPage(
                                                `/pages/message/chat?toid=${shopInfo?.userId}&toname=${shopInfo?.shopName}`
                                            )
                                        "
                                    >
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
                <nut-swiper-item v-for="(item, index) in shopBannerList" :key="item.id">
                    <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                    <image :src="item.imageUrl" mode="aspectFill" class="wfull hfull" />
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
            <div class="flex-1 min-h-0 wfull flex flex-wrap justify-between">
                <scroll-view scroll-y class="wfull hfull" @scrolltolower="getList(true)">
                    <div class="wfull hfull flex flex-wrap justify-between">
                        <div
                            v-for="(item, index) in merchList"
                            :key="item.id"
                            :id="index"
                            class="w-326 mb-[24px]"
                            @click.stop="gotoPage(`/pages/product/details?id=${item.id}`)"
                        >
                            <div class="w-full h-342 overflow-hidden flex">
                                <image :src="item.imageUrl" mode="aspectFill" class="w-full hfull" />
                            </div>
                            <div class="bg-#fff b-rd-b-16 box-border p-16">
                                <div class="text-24">{{ item.merchName }}</div>
                                <div>
                                    <span class="font-500 text-18">￥</span>
                                    <span class="text-24 font-700">{{ item.price }}</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex items-center border-1 border-#000 border-solid">
                                        <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                        <span class="text-12 mx-10">省{{ item.price - item.currentPrice }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-swiper-pagination) {
    bottom: 120rpx;
}
</style>
