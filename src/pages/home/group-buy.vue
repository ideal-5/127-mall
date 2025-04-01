<!-- 团购专区 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { groupBuyProductListApi } from "@/api";
import type { GroupBuy } from "@/api";
import { gotoPage } from "@/utils/uni";

const searchValue = ref("");

const paging = {
    page: 1,
    limit: 10,
};
const list = ref<GroupBuy.Product[]>([]);
const getList = async (isPush: boolean = false) => {
    let { data } = await groupBuyProductListApi({
        merchName: searchValue.value,
        page: isPush ? paging.page + 1 : 1,
        limit: 10,
    });
    if (isPush) {
        if (data.length === 0) return;
        paging.page++;
        list.value.push(...data);
    } else {
        paging.page = 1;
        list.value = data;
    }
};

onMounted(() => getList(false));
onReachBottom(() => getList(true));
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <nut-searchbar
                        v-model="searchValue"
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
                            <div class="size-40 flex-center" @click="getList(false)">
                                <span class="i-mdi:magnify text-#000 size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                </div>
            </template>
        </NavBar>
        <!-- 上方背景图 -->
        <div class="bg wfull h392 relative z--1 flex-shrink-0"></div>
        <div
            class="flex-1 min-h0 wfull bg-[linear-gradient(180deg,#F81517_0%,#F6F6F6_17%,#F3F3F3_56%,#FFFFFF_100%)] box-border px-32 overflow-scroll"
        >
            <scroll-view class="wfull hfull" scroll-y @scrolltolower="getList(true)">
                <div
                    class="wfull flex mb30 bg-#fff b-rd-16 box-border py20 px16"
                    v-for="(item, index) in list"
                    :key="item.id"
                    @click="gotoPage(`/pages/product/details?id=${item.merchId}`)"
                >
                    <div class="size-210 flex-shrink-0">
                        <image :src="item.skuImage" mode="aspectFill" class="b-rd-10 size-full" />
                    </div>
                    <div class="flex-1 min-w-0 box-border pl-44">
                        <div class="wfull flex items-center overflow-scroll mb10">
                            <div
                                class="bg-#EC3013 b-rd-4 text-#fff text-20 box-border px10 py3 mr10 whitespace-nowrap"
                                v-for="(it, ind) in item.properties"
                                :key="ind"
                            >
                                {{ it.value }}
                            </div>
                        </div>
                        <div class="text-30 font-500">{{ item.skuName }}</div>
                        <div class="wfull flex items-center mb20 mt10">
                            <div class="bg-#FFECC1 b-rd-full text-#6B582B text-18 box-border px15 py5">
                                立省{{ item.price - item.currentPrice }}元
                            </div>
                        </div>
                        <div class="wfull flex items-center">
                            <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                                <div class="font-500 mx15">
                                    <span class="text-22">￥</span>
                                    <span class="text-32">{{ item.currentPrice }}</span>
                                </div>
                                <div class="text-18">券后价</div>
                            </div>
                            <div class="h58 w94 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8">
                                抢
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/group-buy-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
