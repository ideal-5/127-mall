<!-- 

专区<团购 二手>

-->
<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
</script>

<template>
    <div class="w-348 h-274 flex items-center justify-between">
        <div class="w-172 h-274 position-relative" @click="gotoPage('group-buy')">
            <image src="" mode="aspectFill" class="bg-red size-full b-rd-10" />
            <div
                class="bg-[rgba(0,0,0,0.7)] h-35 position-absolute top-10 left-10 b-rd-999 flex items-center box-border px-10"
            >
                <image src="@/static/img/tuangou.png" class="size-23 mr-5" />
                <span class="text-14 text-#fff">团购专区</span>
            </div>
        </div>
        <div class="w-172 h-274 position-relative">
            <image src="" mode="aspectFill" class="bg-red size-full b-rd-10" />
            <div
                class="bg-[rgba(0,0,0,0.7)] h-35 position-absolute top-10 left-10 b-rd-999 flex items-center box-border px-10"
            >
                <image src="@/static/img/ershou.png" class="size-23 mr-5" />
                <span class="text-14 text-#fff">二手专区</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
