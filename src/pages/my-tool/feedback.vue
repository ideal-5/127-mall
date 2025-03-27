<script setup lang="ts">
import { ref } from "vue";
import { userFeedbackApi } from "@/api";

const feedbackValue = ref("");
const toast = useToast();
const submit = async () => {
    let { code } = await userFeedbackApi({ suggest: feedbackValue.value });
    if (code === 200) {
        toast.text("反馈成功");
        setTimeout(() => {
            uni.navigateBack();
        }, 1000);
    }
};
</script>

<template>
    <div class="main bg-#F1F1F1 box-border px-34">
        <NavBar barColor="#fff">意见反馈</NavBar>
        <div class="bg-#fff b-rd-12 mt22 box-border p28">
            <div class="text-28 font-500 mb20">反馈意见</div>
            <nut-textarea v-model="feedbackValue" limit-show max-length="150" />
        </div>
        <div class="text-26 text-#fff flex-center bg-#FFAA48 wfull h80 mt26" @click="submit">立即提交</div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    padding: 10rpx;
    background-color: #f5f5f5;
    border-radius: 12rpx;
}
</style>
