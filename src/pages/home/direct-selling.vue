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

const activeTab = ref("1");
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <span class="text-42 text-#fff mx-10 whitespace-nowrap">厂家批发</span>
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
        <div class="bg wfull h398 relative z--1 flex-shrink-0">
            <div
                class="w310 h168 border-solid border-4 border-#154BD2 b-rd-16 bg-#fff absolute bottom-45 right-30 flex items-center justify-around"
            >
                <div class="w118 h116 relative" v-for="(item, index) in 2" :key="index">
                    <image :src="`https://picsum.photos/700/350?random=${Math.random()}`" mode="aspectFill" class="size-full" />
                    <div
                        class="text-#EC3013 absolute top-[100%] left-[50%] translate-[-50%] bg-#FEEAE7 b-rd-full box-border px15 py5 flex items-center"
                    >
                        <span class="text-14">￥</span>
                        <span class="text-20">6.99</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wfull box-border px-30 mt--34 flex-1 min-h-0 flex flex-col">
            <!-- 今日热销 -->
            <div
                class="w-full bg-[linear-gradient(180deg,#D8F1FF_0%,#FFFDF9_44%,#FFFFFF_95%,#FFF5DF_100%)] b-rd-16 box-border px20 py30 flex-shrink-0"
            >
                <div class="wfull flex items-center justify-between mb30">
                    <image src="@/static/img/jinrirexiao-text.png" class="w126 h34" />
                    <span text="20">2万人正在热抢...</span>
                </div>
                <div class="wfull flex items-center justify-around">
                    <div
                        class="w146 h202 bg-#fff b-rd-12 b-solid b-#FFAA48 b-2 relative"
                        v-for="(item, index) in 4"
                        :key="index"
                    >
                        <image :src="`https://picsum.photos/700/350?random=${Math.random()}`" mode="aspectFill" class="size-full b-rd-12" />
                        <div class="absolute top-0 left-0 bg-#FEEAE7 b-rd-full text-14 text-#EC3013">热销5万+</div>
                        <div
                            class="text-#EC3013 absolute top-[100%] left-[50%] translate-[-50%] bg-#FEEAE7 b-rd-full box-border px15 py5 flex items-center"
                        >
                            <span class="text-14">￥</span>
                            <span class="text-20">6.99</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 min-h0 wfull flex flex-col">
                <div class="wfull h100 flex items-center overflow-scroll">
                    <div
                        class="flex-center text-26 box-border px15 py5 b-rd-full mr20 whitespace-nowrap transition"
                        :class="activeTab === item.value ? 'text-#EC3013 bg-#FEEAE7' : 'text-#AEAEAE bg-#EBEBEB'"
                        v-for="(item, index) in tabList"
                        @click="activeTab = item.value"
                    >
                        {{ item.title }}
                    </div>
                </div>
                <div class="flex-1 min-h0 wfull overflow-scroll">
                    <div class="wfull flex mb30" v-for="(item, index) in 10">
                        <div class="size-220 flex-shrink-0">
                            <image :src="`https://picsum.photos/700/350?random=${index}`" mode="aspectFill" class="b-rd-10 size-full" />
                        </div>
                        <div class="flex-1 min-w-0 box-border pl-44">
                            <div class="text-30 font-500">【新人福利】一次性洗脸巾</div>
                            <div class="wfull flex items-center mt20">
                                <nut-progress
                                    percentage="50"
                                    :show-text="false"
                                    style="--nut-progress-outer-background-color: #feeae7"
                                    status="active"
                                />
                                <div class="text-#AEAEAE text-20 whitespace-nowrap ml25 mr35">已售3万+</div>
                            </div>
                            <div class="wfull flex items-center my-20">
                                <div
                                    class="text-22 text-#EC3013 b-1 b-solid b-#EC3013 b-rd-4 flex-center box-border px5 py3"
                                >
                                    急速退款
                                </div>
                            </div>
                            <div class="wfull flex items-center">
                                <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                                    <div class="font-500 mx15">
                                        <span class="text-22">￥</span>
                                        <span class="text-32">9.99</span>
                                    </div>
                                    <div class="text-18">券后价</div>
                                </div>
                                <div class="h58 w94 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8">
                                    抢
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.bg {
    background: url("@/static/bj/direct-selling-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
