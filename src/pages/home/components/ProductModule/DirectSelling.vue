<!-- 
 
厂家直销

-->

<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
</script>

<template>
    <div
        class="bg-[linear-gradient(179deg,#FFDBB8_0%,#FFFFFF_40%,#FFFFFF_100%)] w-324 h-464 box-border px-16 b-rd-10"
        @click.stop="gotoPage('direct-selling')"
    >
        <div class="text-30 font-900 h-70 flex items-center">厂家直销</div>
        <div class="flex flex-wrap justify-between">
            <div v-for="(item, index) in 4" :key="index" class="flex flex-col items-center mb-20">
                <div class="size-134 position-relative">
                    <image class="bg-red size-full b-rd-10" src="" alt="" />
                    <div
                        class="bg-[#FEEAE7] b-rd-6 w-84 h-28 flex items-center justify-center position-absolute top-[100%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <span class="text-14 text-[#EC3013]">已补6.99元</span>
                    </div>
                </div>
                <span class="text-22 text-[#EC3013] mt-20 font-500">￥35.99</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.aaa {
    transform: translateX(-50%);
}
</style>
