<script setup lang="ts">
import { useUserStore } from "@/store";

const userStore = useUserStore();
</script>

<template>
    <div class="main box-border px-32">
        <div
            class="bg-[linear-gradient(180deg,#FF9113_0%,#FFEDC4_100%)] size-1206 b-rd-full fixed top-0 left-50% translate-[-50%,-70%] z--1"
        ></div>
        <NavBar barColor="#fff">会员中心</NavBar>

        <div class="bg w100% h402 box-border p40 mt60 flex-col justify-between">
            <div flex items-center>
                <div size-104 mr32>
                    <image :src="userStore.user?.headImage" mode="aspectFill" class="size-full b-rd-full" />
                </div>
                <div>
                    <div text-34 fw500 mb10>{{ userStore.user?.userName }}</div>
                    <div text-26>{{ userStore.user?.phone }}</div>
                </div>
            </div>
            <div class="wfull flex items-center justify-between">
                <div fw500 text-26>剩余天数 ：23天</div>
                <div class="bg-[rgba(0,0,0,0.60)] text-22 text-#fff b-rd-full box-border py8 px15 flex-center">
                    <span>立即续费</span>
                    <span i-mdi:chevron-right></span>
                </div>
            </div>
        </div>

        <div class="shadow-[0rpx_6rpx_12rpx_0rpx_rgba(0,0,0,0.1608)] wfull h310 b-rd-20 mt34 box-border p32">
            <div flex items-center>
                <div class="bg-[linear-gradient(180deg,#FECE62_0%,#FF9113_100%)] w8 h36 b-rd-full mr18"></div>
                <div text-26 fw500>会员尊享权益</div>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/vip-center-bj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
