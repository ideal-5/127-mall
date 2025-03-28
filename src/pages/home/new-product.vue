<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import { newProductSortListApi, newProductProductListApi } from "@/api";
import type { NewProduct } from "@/api";
import { gotoPage } from "@/utils/uni";

const searchValue = ref("");

const activeTab = ref<number>(-1);
const tabList = ref<NewProduct.Sort[]>([]);
onMounted(async () => {
    let { body } = await newProductSortListApi();
    tabList.value = body;
    activeTab.value = 0;
});

const paging = ref({
    page: 1,
    limit: 6,
});
const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();
const getList = async (isPush: boolean = false) => {
    if (!tabList.value) return;
    let { data } = await newProductProductListApi({
        merchName: searchValue.value,
        sortId: tabList.value[activeTab.value].id,
        page: isPush ? paging.value.page + 1 : 1,
        limit: paging.value.limit,
    });
    if (isPush) {
        if (WaterfallsFlowRef.value) {
            let complete = await WaterfallsFlowRef.value.pushData(
                data.map((item) => ({ ...item, img: item.imageUrl }))
            );
            complete && paging.value.page++;
        }
    } else {
        if (WaterfallsFlowRef.value) {
            WaterfallsFlowRef.value.clearList();
            await WaterfallsFlowRef.value.pushData(data.map((item) => ({ ...item, img: item.imageUrl })));
        }
    }
};

watch(
    () => activeTab.value,
    () => {
        getList(false);
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
                        @search="getList(false)"
                        @clear="getList(false)"
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
                    keyName="name"
                    v-model:activeTab="activeTab"
                    style="--tabs-line-bagcolor: linear-gradient(180deg, #ffffff 0%, #fd797d 100%)"
                ></Tabs>
            </div>
            <div class="flex-1 min-h-0 wfull overflow-scroll">
                <scroll-view
                    class="wfull hfull min-h-0 overflow-scroll box-border px-34"
                    scroll-y
                    @scrolltolower="getList(true)"
                >
                    <!-- 商品列表 -->
                    <WaterfallsFlow
                        ref="WaterfallsFlowRef"
                        :key="activeTab"
                        @itemClick="
                            (i) => {
                                gotoPage(`/pages/product/details?id=${i.id}`);
                            }
                        "
                    >
                        <template #text="{ item }">
                            <div class="bg-#fff b-rd-b-16 box-border p-16">
                                <div class="text-24">{{ item.merchName }}</div>
                                <div>
                                    <span class="font-500 text-18">￥</span>
                                    <span class="text-24 font-700">{{ item.currentPrice }}</span>
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
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/new-product-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
