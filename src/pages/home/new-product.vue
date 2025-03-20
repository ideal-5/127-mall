<script setup lang="ts">
import { ref, watch, nextTick,onMounted } from "vue";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
const searchValue = ref("");

const tabList = ref([
    { title: "热卖", value: "1" },
    { title: "鞋服衣饰", value: "2" },
    { title: "纸巾清洁", value: "3" },
    { title: "家居百货", value: "4" },
    { title: "情趣内衣", value: "5" },
]);

const activeTab = ref(0);

const list = ref([
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
]);
const WaterfallsFlowRef = ref<{ pushData: (data: Product[]) => void }>();

onMounted(()=>{
    WaterfallsFlowRef.value && WaterfallsFlowRef.value.pushData(list.value);
})

watch(
    () => activeTab.value,
    () => {
        nextTick(() => {
            WaterfallsFlowRef.value && WaterfallsFlowRef.value.pushData(list.value);
        });
    }
);
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <image src="@/static/img/xinpinshangshi-text.png" class="w192 h102 mr20" />
                    <nut-searchbar
                        v-model="searchValue"
                        style="
                            --nut-searchbar-input-height: 70rpx;
                            --nut-searchbar-input-border-radius: 14rpx;
                            --nut-searchbar-padding: 0;
                            --nut-searchbar-background: transparent;
                            --nut-searchbar-input-background: #fff;
                        "
                    >
                        <template #leftin>
                            <div class="size-40 flex-center">
                                <span class="i-mdi:magnify text-#000 size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                </div>
            </template>
        </NavBar>
        <!-- 上方背景图 -->
        <div class="bg wfull h568 relative z--1 flex-shrink-0"></div>
        <div class="flex-1 min-h-0 wfull bg-#fff b-rd-t-24 mt--80 flex flex-col">
            <div class="wfull h100">
                <Tabs
                    :tabList="tabList"
                    keyName="title"
                    v-model:activeTab="activeTab"
                    style="--tabs-line-bagcolor: linear-gradient(180deg, #ffffff 0%, #fd797d 100%)"
                ></Tabs>
            </div>
            <div class="flex-1 min-h-0 wfull overflow-scroll">
                <scroll-view class="wfull flex-1 min-h-0 overflow-scroll box-border px-34" scroll-y>
                    <!-- 商品列表 -->
                    <WaterfallsFlow ref="WaterfallsFlowRef" :key="activeTab">
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
        </div>
    </div>
</template>
<route lang="json">
{
    "layout": "anyLayout"
}
</route>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/new-product-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
