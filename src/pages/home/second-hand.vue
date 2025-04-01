<script setup lang="ts">
import { ref, watch } from "vue";
import { secondHandGetSecondHandSortListApi, secondHanProductListApi } from "@/api";
import type { SecondHand } from "@/api";
import { gotoPage } from "@/utils/uni";

const searchValue = ref("");

const activeTab = ref<number>(-1);
const tabList = ref<SecondHand.Sort[]>();
onMounted(async () => {
    let { body } = await secondHandGetSecondHandSortListApi();
    tabList.value = body;
    activeTab.value = 0;
});
const paging = ref({
    page: 1,
    limit: 10,
});
const list = ref<SecondHand.Product[]>([]);
const getList = async (isPush: boolean = false) => {
    if (!tabList.value) return;
    if (isPush) {
        paging.value.page++;
    } else {
        paging.value.page = 1;
    }
    let { data } = await secondHanProductListApi({
        merchName: searchValue.value,
        sortId: tabList.value[activeTab.value].id,
        ...paging.value,
    });
    if (isPush) {
        list.value.push(...data);
    } else {
        list.value = data;
    }
};
watch(
    () => activeTab.value,
    () => {
        getList(false);
    }
);
const toast = useToast();
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <span class="text-42 text-#fff mx-10 whitespace-nowrap">二手市场</span>
                    <nut-searchbar
                        v-model="searchValue"
                        confirm-type="search"
                        @search="getList(false)"
                        @clear="getList(false)"
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
        <div class="bg wfull h908 relative z--1 flex-shrink-0"></div>
        <div
            class="wfull box-border px-30 mt--388 flex-1 min-h-0 flex flex-col bg-[linear-gradient(179deg,#5EB9D6_0%,#FFFFFF_6%,#FFFFFF_100%)] b-rd-t-14"
        >
            <div class="flex-1 min-h0 wfull flex flex-col">
                <div class="flex items-center h100">
                    <Tabs
                        v-if="tabList"
                        :tabList="tabList"
                        v-model:activeTab="activeTab"
                        keyName="name"
                        style="--tabs-line-bagcolor: linear-gradient(180deg, #ffffff 0%, #5eb9d6 100%)"
                    ></Tabs>
                </div>
                <div class="flex-1 min-h0 wfull">
                    <scroll-view class="hfull wfull overflow-scroll" scroll-y @scrolltolower="getList(true)">
                        <div
                            class="wfull flex mb30"
                            v-for="(item, index) in list"
                            :key="item.id"
                            @click="gotoPage(`/pages/product/details?id=${item.id}`)"
                        >
                            <div class="size-220 flex-shrink-0">
                                <image :src="item.imageUrl" mode="aspectFill" class="b-rd-10 size-full" />
                            </div>
                            <div class="flex-1 min-w-0 box-border pl-44">
                                <div class="text-30 font-500">{{ item.merchName }}</div>
                                <div class="wfull flex items-center mt20">
                                    <div class="text-20 font-500 text-#949494 mr30">原价:￥{{ item.price }}</div>
                                    <div class="bg-#FFECC1 b-rd-full text-#6B582B text-18 box-border px15 py5">
                                        立省{{ item.price - item.currentPrice }}元
                                    </div>
                                </div>
                                <div class="wfull flex items-center my-20 overflow-scroll">
                                    <div
                                        class="text-22 whitespace-nowrap text-#EC3013 b-1 b-solid b-#EC3013 b-rd-4 flex-center box-border px5 py3 mr15"
                                        v-for="(it, ind) in item.properties"
                                        :key="ind"
                                    >
                                        {{ it.value }}
                                    </div>
                                </div>
                                <div class="wfull flex items-center">
                                    <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                                        <div class="font-500 mx15">
                                            <span class="text-22">￥</span>
                                            <span class="text-32">{{ item.currentPrice }}</span>
                                        </div>
                                        <!-- <div class="text-18">券后价</div> -->
                                    </div>
                                    <div
                                        class="h58 w150 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8"
                                    >
                                        去抢购
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/second-hand-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
