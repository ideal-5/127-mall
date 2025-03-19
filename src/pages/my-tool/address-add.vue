<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const text = ref("");
</script>

<template>
    <div class="main flex flex-col items-center">
        <NavBar style="--my-navbar-border-bottom-color: #f2f2f2">添加地址</NavBar>
        <div class="wfull flex">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:map-marker-radius"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="text"
                    placeholder="请输入所在区域"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                >
                    <template #left>
                        <span class="text-26 font-500">所在区域</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:tag"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="text"
                    placeholder="请输入详细地址与门牌号"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                >
                    <template #left>
                        <span class="text-26 font-500">详细地址与门牌号</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:account"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="text"
                    placeholder="请输入收货人姓名"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                >
                    <template #left>
                        <span class="text-26 font-500">收货人姓名</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:phone"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="text"
                    placeholder="请输入手机号码"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                >
                    <template #left>
                        <span class="text-26 font-500">手机号</span>
                    </template>
                </nut-input>
            </div>
        </div>

        <div class="w660 h72 flex-center text-#fff text-30 font-500 bg-#FFAA48 b-rd-full mt-100">保存地址</div>
    </div>
</template>

<route lang="json">
{
    "layout": "anyLayout"
}
</route>
