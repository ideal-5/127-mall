<!-- 
 
新品上市

-->
<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
</script>

<template>
    <div
        class="w-348 h-758 bg-[linear-gradient(179deg,#FFDBB8_0%,#FFFFFF_40%,#FFFFFF_100%)] b-rd-10 box-border px-20"
        @click.stop="gotoPage('new-product')"
    >
        <div class="flex items-center h-50">
            <div class="text-30 pr-15">
                <span>新品</span>
                <span class="text-#EC3013">上市</span>
            </div>
            <div class="text-18 text-#717171 b-l-solid b-#717171 b-l-1 pl-15">限时限量抢好物</div>
        </div>
        <div class="w-full flex flex-wrap justify-between">
            <div v-for="(item, index) in 8" :key="index" class="w-142 h-134 mb-48 position-relative">
                <image src="" class="bg-red size-full b-rd-10" />
                <div
                    class="text-18 font-500 text-#EC3013 bg-#FEEAE7 position-absolute top-100% left-50% transform -translate-50% b-rd-999 px-16 py-8"
                >
                    ￥66.70
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.aaa {
    width: 90rpx;
    height: 34rpx;
    background: #feeae7;
    border-radius: 18rpx 18rpx 18rpx 18rpx;
}
</style>
