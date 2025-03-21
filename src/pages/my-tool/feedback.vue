<script setup lang="ts">
import { ref } from "vue";

const feedbackValue = ref("");
</script>

<template>
    <div class="main bg-#F1F1F1 box-border px-34">
        <NavBar barColor="#fff">意见反馈</NavBar>
        <div class="bg-#fff b-rd-12 mt22 box-border p28">
            <div class="text-28 font-500 mb20">反馈意见</div>
            <nut-textarea v-model="feedbackValue" limit-show max-length="150" />
        </div>
        <div class="text-26 text-#fff flex-center bg-#FFAA48 wfull h80 mt26">立即提交</div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    padding: 10rpx;
    background-color: #f5f5f5;
    border-radius: 12rpx;
}
</style>
