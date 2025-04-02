<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import type { Product } from "@/types";
import { gotoPage } from "@/utils/uni";
import { productSearchApi, configGetShopSortListApi, shopSearchListApi } from "@/api";
import type { Shop } from "@/api";

const searchValue = ref("");

const activeTab = ref(-1);
const tabsList = ref([
    {
        title: "全部",
        id: "all",
    },
    {
        title: "店铺",
        id: "1",
    },
]);
/**
 * 商品
 */
let ids = "";
onMounted(async () => {
    let { data } = await configGetShopSortListApi({ page: 1, limit: 9999 });
    ids = data
        .filter(({ value }) => ["NEW_BUY", "UNDERWEAR_BUY"].includes(value))
        .map(({ id }) => id)
        .join(",");
    activeTab.value = 0;
});
const paging = {
    page: 1,
    limit: 10,
};
async function getProductList(isPush: boolean = false) {
    if (!WaterfallsFlowRef.value) return;
    let { data } = await productSearchApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        value: searchValue.value,
        shopSortId: ids,
    });
    if (isPush) {
        paging.page++;
        WaterfallsFlowRef.value.pushData(data.map((item) => ({ ...item, img: item.imageUrl, idk: `key${item.id}` })));
    } else {
        paging.page = 1;
        WaterfallsFlowRef.value.clearList();
        WaterfallsFlowRef.value.pushData(data.map((item) => ({ ...item, img: item.imageUrl, idKey: `key${item.id}` })));
    }
}

/**
 * 店铺
 */
const shopPaging = {
    page: 1,
    limit: 10,
};
const shopList = ref<Shop.SearchListResult[]>([]);
async function getShopList(isPush: boolean = false) {
    let { data } = await shopSearchListApi({
        page: isPush ? shopPaging.page + 1 : 1,
        limit: shopPaging.limit,
        value: searchValue.value,
        shopSortId: ids,
    });
    shopList.value = data;
}

/**
 *
 */
function getList(isPush: boolean = false) {
    if (activeTab.value === 0) {
        nextTick(() => {
            getProductList(isPush);
        });
    } else if (activeTab.value === 1) {
        getShopList(isPush);
    }
}

watch(
    () => activeTab.value,
    () => getList(false)
);

const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();
</script>

<template>
    <div class="main flex flex-col max-h-100vh">
        <NavBar isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <nut-searchbar
                        v-model="searchValue"
                        style="
                            --nut-searchbar-input-height: 70rpx;
                            --nut-searchbar-input-border-radius: 14rpx;
                            --nut-searchbar-padding: 0;
                            --nut-searchbar-background: transparent;
                            --nut-searchbar-input-background: rgba(255, 255, 255, 0.6);
                        "
                        @search="getList(false)"
                        @clear="getList(false)"
                    >
                        <template #leftin>
                            <div class="size-40 flex-center">
                                <span class="i-mdi:magnify text-#fff size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                    <span class="text-28 font-500 text-#fff mx-10 whitespace-nowrap" @click="getList(false)">搜索</span>
                </div>
            </template>
        </NavBar>
        <!-- tabs -->
        <div class="wfull h-150 flex flex-shrink-0 items-center">
            <Tabs
                :tabList="tabsList"
                keyName="title"
                v-model:activeTab="activeTab"
                style="--tabs-line-bagcolor: #fff; --tabs-text-color: #fff; --tabs-text-active-color: #fff"
            ></Tabs>
            <!-- <div class="flex-center w-200">
                <span class="text-28 text-#fff">筛选</span>
                <span class="i-mdi:filter-cog-outline text-#fff"></span>
            </div> -->
        </div>
        <!-- 商品列表 -->
        <div
            class="flex-1 min-h-0 wfull bg-#F8F8F8 b-rd-t-22 box-border px-32 overflow-hidden pt-30 flex flex-col"
            v-if="activeTab === 0"
        >
            <scroll-view class="wfull flex-1 min-h-0 overflow-scroll" scroll-y>
                <!-- 商品列表 -->
                <WaterfallsFlow ref="WaterfallsFlowRef">
                    <template #text="{ item }">
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
                    </template>
                </WaterfallsFlow>
            </scroll-view>
        </div>
        <!-- 店铺列表 -->
        <div
            class="flex-1 min-h-0 wfull bg-#F8F8F8 b-rd-t-22 overflow-hidden pt-30 flex flex-col"
            v-if="activeTab === 1"
        >
            <scroll-view class="wfull flex-1 min-h-0 overflow-scroll" scroll-y>
                <div
                    class="w-full border-b-solid border-b-#DCDCDC border-b-1 box-border px-30 mb24"
                    v-for="(item, index) in shopList"
                    :key="item.shopInfo.id"
                    @click.stop="gotoPage('shop-home')"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex-center">
                            <div class="mr24">
                                <image :src="item.shopInfo.shopLogo" mode="aspectFill" class="size-84 b-rd-12" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-26 font-500">{{ item.shopInfo.shopName }}</span>
                                <!-- <span class="text-#949494 text-22 mt-8">全场包邮 退货包运费</span> -->
                            </div>
                        </div>
                        <div
                            class="bg-[linear-gradient(270deg,#FFAA48_0%,#FC685C_100%)] b-rd-full text-#fff text-24 flex-center box-border px20 py10"
                        >
                            <span>进店</span>
                            <span class="i-mdi:chevron-right size-24"></span>
                        </div>
                    </div>
                    <div class="w-full mt28 mb36 grid grid-cols-4">
                        <div
                            class="size-168 b-rd-10 overflow-hidden relative"
                            v-for="(it, ind) in item.merchList"
                            :key="ind"
                        >
                            <image :src="it.imageUrl" mode="aspectFill" class="size-full" />
                            <div
                                class="text-#fff bg-[rgba(0,0,0,0.5)] b-rd-full absolute bottom-10 left-50% -translate-x-50% box-border px20 py10 flex-center"
                            >
                                <span class="text-14">￥</span>
                                <span class="text-18">{{ it.currentPrice }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    background: url("@/static/bj/search-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
