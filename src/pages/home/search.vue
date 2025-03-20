<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import type { Product } from "@/types";
import { gotoPage } from "@/utils/uni";

const searchValue = ref("");

const activeTab = ref(1);
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
const tabChange = (index: number) => {
    if (index === 0) {
    }
};
watch(
    () => activeTab.value,
    () => {
        console.log("activeTab.value", activeTab.value);
        if (activeTab.value === 0) {
            nextTick(() => {
                WaterfallsFlowRef.value && WaterfallsFlowRef.value.pushData(list.value);
            });
        }
    }
);

const list = ref<Product[]>([ 
    {
        img: "https://picsum.photos/300/450",
        name: "家用3C 数码电器电饭煲",
        price: "311.99",
        vprice: "18.00",
        idKey: "a1",
    },
    { img: "https://picsum.photos/300/520", name: "智能手表 运动监测", price: "199.99", vprice: "25.00", idKey: "a2" },
    {
        img: "https://picsum.photos/300/430",
        name: "无线蓝牙耳机 降噪版",
        price: "129.99",
        vprice: "15.00",
        idKey: "a3",
    },
    {
        img: "https://picsum.photos/300/480",
        name: "家用空气炸锅 健康低脂",
        price: "279.99",
        vprice: "22.00",
        idKey: "a4",
    },
    { img: "https://picsum.photos/300/510", name: "便携式投影仪 高清", price: "459.99", vprice: "30.00", idKey: "a5" },
    {
        img: "https://picsum.photos/300/400",
        name: "高性能游戏鼠标 RGB灯光",
        price: "89.99",
        vprice: "10.00",
        idKey: "a6",
    },
    {
        img: "https://picsum.photos/300/550",
        name: "时尚智能音箱 语音助手",
        price: "159.99",
        vprice: "18.50",
        idKey: "a7",
    },
    {
        img: "https://picsum.photos/300/470",
        name: "家用电动剃须刀 便捷",
        price: "109.99",
        vprice: "12.00",
        idKey: "a8",
    },
    {
        img: "https://picsum.photos/300/530",
        name: "办公无线键盘 机械手感",
        price: "139.99",
        vprice: "17.00",
        idKey: "a9",
    },
    {
        img: "https://picsum.photos/300/490",
        name: "高清摄像头 直播专用",
        price: "249.99",
        vprice: "28.00",
        idKey: "a10",
    },
]);
const WaterfallsFlowRef = ref<{ pushData: (data: Product[]) => void }>();
</script>

<template>
    <div class="main flex flex-col max-h-100vh">
        <NavBar isBackIconFill>
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
                    >
                        <template #leftin>
                            <div class="size-40 flex-center">
                                <span class="i-mdi:magnify text-#fff size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                    <span class="text-28 font-500 text-#fff mx-10">搜索</span>
                </div>
            </template>
        </NavBar>
        <!-- tabs -->
        <div class="wfull h-150 flex flex-shrink-0 items-center">
            <Tabs
                :tabList="tabsList"
                keyName="title"
                v-model:activeTab="activeTab"
                @change="tabChange"
                style="--tabs-line-bagcolor: #fff; --tabs-text-color: #fff; --tabs-text-active-color: #fff"
            ></Tabs>
            <div class="flex-center w-200">
                <span class="text-28 text-#fff">筛选</span>
                <span class="i-mdi:filter-cog-outline text-#fff"></span>
            </div>
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
                            <div class="text-24">{{ item.name }}</div>
                            <div>
                                <span class="font-500 text-18">￥</span>
                                <span class="text-24 font-700">{{ item.price }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center border-1 border-#000 border-solid">
                                    <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                    <span class="text-12 mx-10">省{{ item.vprice }}</span>
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
                    v-for="(item, index) in 15"
                    :key="index"
                    @click.stop="gotoPage('shop-home')"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex-center">
                            <div class="mr24">
                                <image src="https://picsum.photos/200/300" mode="aspectFill" class="size-84 b-rd-12" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-26 font-500">Moon橘子店</span>
                                <span class="text-#949494 text-22 mt-8">全场包邮 退货包运费</span>
                            </div>
                        </div>
                        <div
                            class="bg-[linear-gradient(270deg,#FFAA48_0%,#FC685C_100%)] b-rd-full text-#fff text-24 flex-center box-border px20 py10"
                        >
                            <span>进店</span>
                            <span class="i-mdi:chevron-right size-24"></span>
                        </div>
                    </div>
                    <div class="w-full flex items-center justify-around mt28 mb36">
                        <div class="size-168 b-rd-10 overflow-hidden relative" v-for="(it, ind) in 4" :key="ind">
                            <image src="https://picsum.photos/200/300" mode="aspectFill" class="size-full" />
                            <div
                                class="text-#fff bg-[rgba(0,0,0,0.5)] b-rd-full absolute bottom-10 left-50% -translate-x-50% box-border px20 py10 flex-center"
                            >
                                <span class="text-14">￥</span>
                                <span class="text-18">45.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>
<route lang="json">
{
    "layout": "anyLayout"
}
</route>
<style scoped lang="scss">
.main {
    background: url("@/static/bj/search-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
