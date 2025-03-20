<!-- 团购专区 -->
<script setup lang="ts">
import { ref } from "vue";
const searchValue = ref("");
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
                            --nut-searchbar-input-background: rgba(255,255,255,0.5);
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
        <div class="bg wfull h392 relative z--1 flex-shrink-0"></div>
        <div
            class="flex-1 min-h0 wfull bg-[linear-gradient(180deg,#F81517_0%,#F6F6F6_17%,#F3F3F3_56%,#FFFFFF_100%)] box-border px-32 overflow-scroll"
        >
            <div class="wfull flex mb30 bg-#fff b-rd-16 box-border py20 px16" v-for="(item, index) in 10">
                <div class="size-210 flex-shrink-0">
                    <image src="https://picsum.photos/200" mode="aspectFill" class="b-rd-10 size-full" />
                </div>
                <div class="flex-1 min-w-0 box-border pl-44">
                    <div class="wfull flex items-center">
                        <div class="bg-#EC3013 b-rd-4 text-#fff text-20 box-border px10 py3">3人团</div>
                    </div>
                    <div class="text-30 font-500">【新人福利】一次性洗脸巾</div>
                    <div class="wfull flex items-center my20">
                        <div class="bg-#FFECC1 b-rd-full text-#6B582B text-18 box-border px15 py5">立省10.1元</div>
                    </div>
                    <div class="wfull flex items-center">
                        <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                            <div class="font-500 mx15">
                                <span class="text-22">￥</span>
                                <span class="text-32">9.99</span>
                            </div>
                            <div class="text-18">券后价</div>
                        </div>
                        <div class="h58 w94 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8">抢</div>
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
    background: url("@/static/bj/group-buy-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>
