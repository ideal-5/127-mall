<script setup lang="ts">
import { ref } from "vue";
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { useUnderwear } from "@/hooks/useUnderwear";
import type { Underwear } from "@/api";

const { searchValue, bannerList, createGetList } = useUnderwear();

const getListfun = createGetList("MAJOR_CLOTHING");

onMounted(() => {
    getList(false);
});

const list = ref<Underwear.Product[]>([]);
async function getList(isPush: boolean = false) {
    let data = await getListfun(isPush);
    if (isPush) {
        list.value.push(...data);
    } else {
        list.value = data;
    }
}
onReachBottom(() => getList(true));

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});
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
                    <span class="text-28 font-500 text-#605F5F mx-10 whitespace-nowrap" @click="getList(false)">搜索</span>
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
            <nut-swiper-item v-for="(item, index) in bannerList" :key="index">
                <!-- <image src="" mode="aspectFill" class="wfull hfull bg-emerald" /> -->
                <image :src="item.imageUrl" mode="aspectFill" class="wfull hfull" />
            </nut-swiper-item>
        </nut-swiper>
        <div wfull box-border px34>
            <div>
                <div flex items-center mb26>
                    <image src="@/static/img/underwear-3.png" size-36 mr16 />
                    <span fw500 text-32>大牌内衣</span>
                </div>
                <div wfull flex flex-wrap justify-between>
                    <div v-for="(item, index) in list" :key="item.id" :id="index" class="w-326 mb-[24px]">
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
