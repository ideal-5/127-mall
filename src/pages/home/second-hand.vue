<script setup lang="ts">
import { ref } from "vue";
const searchValue = ref("");

const tabList = ref([
    { title: "热卖", value: "1" },
    { title: "鞋服衣饰", value: "2" },
    { title: "纸巾清洁", value: "3" },
    { title: "家居百货", value: "4" },
    { title: "情趣内衣", value: "5" },
]);

const activeTab = ref(0);
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <span class="text-42 text-#fff mx-10">二手市场</span>
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
        <div class="bg wfull h908 relative z--1 flex-shrink-0"></div>
        <div
            class="wfull box-border px-30 mt--388 flex-1 min-h-0 flex flex-col bg-[linear-gradient(179deg,#5EB9D6_0%,#FFFFFF_6%,#FFFFFF_100%)] b-rd-t-14"
        >
            <div class="flex-1 min-h0 wfull flex flex-col">
                <div class="flex items-center h100">
                    <Tabs
                        :tabList="tabList"
                        v-model:activeTab="activeTab"
                        keyName="title"
                        style="--tabs-line-bagcolor: linear-gradient(180deg, #ffffff 0%, #5eb9d6 100%)"
                    ></Tabs>
                </div>
                <div class="flex-1 min-h0 wfull overflow-scroll">
                    <div class="wfull flex mb30" v-for="(item, index) in 10">
                        <div class="size-220 flex-shrink-0">
                            <image src="https://picsum.photos/200" mode="aspectFill" class="b-rd-10 size-full" />
                        </div>
                        <div class="flex-1 min-w-0 box-border pl-44">
                            <div class="text-30 font-500">【新人福利】一次性洗脸巾</div>
                            <div class="wfull flex items-center mt20">
                                <div class="text-20 font-500 text-#949494 mr30 ">原价:￥399.00</div>
                                <div class="bg-#FFECC1 b-rd-full text-#6B582B text-18 box-border px15 py5">立省10.1元</div>
                            </div>
                            <div class="wfull flex items-center my-20">
                                <div
                                    class="text-22 text-#EC3013 b-1 b-solid b-#EC3013 b-rd-4 flex-center box-border px5 py3"
                                >
                                    九成新
                                </div>
                            </div>
                            <div class="wfull flex items-center">
                                <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                                    <div class="font-500 mx15">
                                        <span class="text-22">￥</span>
                                        <span class="text-32">9.99</span>
                                    </div>
                                    <!-- <div class="text-18">券后价</div> -->
                                </div>
                                <div class="h58 w150 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8">
                                    去抢购
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    background: url("@/static/bj/second-hand-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
