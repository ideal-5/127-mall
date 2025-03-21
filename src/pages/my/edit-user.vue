<script setup lang="ts">
import { ref } from "vue";
import { useUpload } from "@/hooks/useUpload";
import { gotoPage } from "@/utils/uni";

const { selectImage } = useUpload();

const showPopup = ref(false);
const popupInp = ref("");
const tapAvatar = async () => {
    try {
        await selectImage();
    } catch (error) {
        uni.showToast({
            title: error.message,
            icon: "none",
        });
    }
};
</script>

<template>
    <div class="main bg-#FCFCFC">
        <NavBar>编辑个人资料</NavBar>
        <div class="bg-#fff shadow-[0rpx_2rpx_4rpx_0rpx_rgba(0,0,0,0.1608)] box-border px-20 pb-30">
            <div class="line" @click="tapAvatar">
                <div class="label">头像</div>
                <div class="value">
                    <image src="https://picsum.photos/200" mode="aspectFill" class="size-64 b-rd-full" />
                    <span class="i-mdi:chevron-right text-#d6d6d6"></span>
                </div>
            </div>
            <div class="line" @click="gotoPage('edit-phone-start')">
                <div class="label">手机号</div>
                <div class="value">
                    <span class="text">191221151565645</span>
                    <span class="i-mdi:chevron-right text-#d6d6d6"></span>
                </div>
            </div>
            <div class="line" @click="showPopup = true">
                <div class="label">昵称</div>
                <div class="value">
                    <span class="text">打开了圣诞节</span>
                    <span class="i-mdi:chevron-right text-#d6d6d6"></span>
                </div>
            </div>
        </div>
        <nut-popup v-model:visible="showPopup" pop-class="w-600 b-rd-14">
            <div class="h-100 text-32 font-500 flex items-center justify-center">修改昵称</div>
            <div class="w-full box-border px-34">
                <nut-input v-model="popupInp" placeholder="请输入文本" clearable></nut-input>
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


<style scoped lang="scss">
.line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #d6d6d6;
    padding: 20rpx 0;
    .label {
        font-size: 26rpx;
        font-weight: 500;
    }
    .value {
        display: flex;
        align-items: center;
        .text {
            font-size: 24rpx;
            color: #acacac;
        }
    }
}

:deep(.nut-input) {
    background-color: #f3f3f3;
    margin: 20rpx 0 35rpx 0;
    border-radius: 8rpx;
}
</style>
