<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
import { ref } from "vue";

const showPopup = ref(true);

const popupInp = ref("");
</script>

<template>
    <div
        class="main bg-[linear-gradient(183deg,#FFDBB8_0%,#FFEDC4_20%,#FCFCFC_45%,#FCFCFC_60%,#FCFCFC_100%)] flex flex-col justify-end"
    >
        <NavBar>更改手机号</NavBar>
        <div class="h-70vh w-full bg-#fff b-rd-tr-26 b-rd-tl-26 flex flex-col items-center">
            <div>
                <image src="https://picsum.photos/200" mode="aspectFill" class="size-214 b-rd-full mt--50%" />
            </div>
            <div class="text-46 font-500 my-32">武庸</div>
            <div class="text-30 text-#FFAA48">当前手机号</div>
            <div class="text-44 font-500 mt52 mb100">191****0101</div>
            <div
                class="w-618 h-82 flex items-center justify-center text-#fff text-30 bg-#FFAA48 b-rd-full"
                @click="showPopup = true"
            >
                更换手机号
            </div>
        </div>

        <nut-popup v-model:visible="showPopup" pop-class="w-600 b-rd-14">
            <div class="h-100 text-32 font-500 flex items-center justify-center">请输入新的手机号</div>
            <div class="w-full box-border px-34">
                <nut-input v-model="popupInp" placeholder="请输入新电话号" clearable></nut-input>
            </div>
            <div class="w-full flex border-t-solid border-#DCDCDC border-1">
                <div
                    class="flex-1 flex items-center justify-center h-100 border-1 border-r-solid border-#DCDCDC text-28 text-#C4C4C4"
                    @click="showPopup = false"
                >
                    取消
                </div>
                <div class="flex-1 flex items-center justify-center h-100">确定</div>
            </div>
        </nut-popup>
    </div>
</template>

<route lang="json">
{
    "layout": "anyLayout"
}
</route>

<style scoped lang="scss">
:deep(.nut-input) {
    background-color: #f3f3f3;
    margin: 20rpx 0 35rpx 0;
    border-radius: 8rpx;
}
</style>
