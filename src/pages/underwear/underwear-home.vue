<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { gotoPage } from "@/utils/uni";
import { useUnderwear } from "@/hooks/useUnderwear";
import { underwearRecommendListApi } from "@/api";
import type { Underwear } from "@/api";

const { searchValue, bannerList } = useUnderwear();

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});

const paging = {
    page: 1,
    limit: 10,
};
const list = ref<Underwear.Product[]>([]);
async function getList(isPush: boolean = false) {
    let { data } = await underwearRecommendListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        merchName: searchValue.value,
    });
    if (isPush) {
        if (data.length === 0) return;
        list.value.push(...data);
    } else {
        list.value = data;
    }
}
onMounted(() => getList(false));
onReachBottom(() => getList(true));
</script>

<template>
    <div>
        <NavBar isBackIconFill isEmptyFill :scrollTop="scrollTop" scrollLimit="1104rpx">
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
                                <span class="i-mdi:magnify text-#605F5F size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                    <span class="text-28 font-500 text-#605F5F mx-10 whitespace-nowrap" @click="getList(false)"
                        >搜索</span
                    >
                </div>
            </template>
        </NavBar>
        <nut-swiper
            :init-page="1"
            :pagination-visible="true"
            pagination-color="#426543"
            pagination-unselected-color="#808080"
            auto-play="30000"
            class="w-full h-1104"
        >
            <nut-swiper-item v-for="(item, index) in bannerList" :key="item.id">
                <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                <image :src="item.imageUrl" mode="aspectFill" class="wfull hfull" />
            </nut-swiper-item>
        </nut-swiper>
        <div wfull box-border px34>
            <div wfull flex items-center justify-between my20>
                <div flex-col items-center @click="gotoPage('underwear-hot')">
                    <image src="@/static/img/underwear-1.png" size-88 mb10 />
                    <span text-27>热卖爆品</span>
                </div>
                <div flex-col items-center @click="gotoPage('underwear-tide')">
                    <image src="@/static/img/underwear-2.png" size-88 mb10 />
                    <span text-27>潮流服饰</span>
                </div>
                <div flex-col items-center @click="gotoPage('underwear-major')">
                    <image src="@/static/img/underwear-3.png" size-88 mb10 />
                    <span text-27>大牌内衣</span>
                </div>
                <div flex-col items-center @click="gotoPage('underwear-story')">
                    <image src="@/static/img/underwear-4.png" size-88 mb10 />
                    <span text-27>品牌故事</span>
                </div>
            </div>
            <div>
                <div flex items-center mb26>
                    <image src="@/static/img/underwear-remen.png" size-36 mr16 />
                    <span fw500 text-32> 精选推荐</span>
                </div>
                <div wfull flex flex-wrap justify-between>
                    <div
                        v-for="(item, index) in list"
                        :key="item.id"
                        :id="index"
                        class="w-326 mb-[24px]"
                        @click="gotoPage(`/pages/product/details?id=${item.id}`)"
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
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
