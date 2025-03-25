<script setup lang="ts">
import { ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import {gotoPage} from "@/utils/uni";

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});

const searchValue = ref("");
const swiperList = ref(Array.from({ length: 5 }, (_, i) => `https://picsum.photos/700/350?random=${Math.random()}`));
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
                    >
                        <template #leftin>
                            <div class="size-40 flex-center">
                                <span class="i-mdi:magnify text-#605F5F size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                    <span class="text-28 font-500 text-#605F5F mx-10 whitespace-nowrap">搜索</span>
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
            <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                <image :src="item" mode="aspectFill" class="wfull hfull" />
            </nut-swiper-item>
        </nut-swiper>
        <div wfull box-border px34>
            <div wfull flex items-center justify-between my20>
                <div flex-col items-center @click="gotoPage('underwear-hot')" >
                    <image src="@/static/img/underwear-1.png" size-88 mb10 />
                    <span text-27>热卖爆品</span>
                </div>
                <div flex-col items-center @click="gotoPage('underwear-tide')"  >
                    <image src="@/static/img/underwear-2.png" size-88 mb10 />
                    <span text-27>潮流服饰</span>
                </div>
                <div flex-col items-center @click="gotoPage('underwear-major')" >
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
    </div>
</template>

<style scoped lang="scss"></style>
