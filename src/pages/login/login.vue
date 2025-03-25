<script setup lang="ts">
import { ref } from "vue";

const text = ref("");

const isAccredit = ref(false);
</script>

<template>
    <div class="main flex-col">
        <div class="bg wfull h522 text-52 fw500 flex-col justify-center box-border pl30 flex-shrink-0">
            <span>你好,</span>
            <span>欢迎登陆*****!</span>
        </div>
        <div
            class="flex-1 min-h-0 wfull box-border px64 b-rd-t-34 bg-#fff -mt-52 box-border pt50 flex-col justify-between sanjiao"
        >
            <div class="wfull flex-col items-center">
                <div class="wfull mb150">
                    <div mb30>
                        <div class="flex items-center">
                            <span class="i-mdi:cellphone-android size-34 mr18"></span>
                            <span class="text-28 fw500">手机号</span>
                        </div>
                        <nut-input
                            v-model="text"
                            placeholder="请输入您的手机号"
                            style="--nut-input-padding: 10px 0"
                        ></nut-input>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <span class="i-mdi:lock-outline size-34 mr18"></span>
                            <span class="text-28 fw500">密码</span>
                        </div>
                        <nut-input
                            v-model="text"
                            placeholder="请输入您的密码"
                            style="--nut-input-padding: 10px 0"
                        ></nut-input>
                    </div>
                </div>
                <div
                    class="bg-[linear-gradient(247deg,#FF9113_0%,#FECE62_100%)] text-30 w524 h76 shadow-[0rpx,6rpx,12rpx,0rpx,#FFDBB8] b-rd-full flex-center"
                >
                    登录
                </div>
                <div class="mt54 text-20 flex items-center" @click="isAccredit = !isAccredit">
                    <div
                        class="size-25 b-rd-full b-solid b-1rpx b-#FF9113 flex-center mr10"
                        :class="isAccredit && 'bg-#FF9113'"
                    >
                        <span i-mdi:check v-if="isAccredit" class="text-#fff"></span>
                    </div>
                    <span>我已阅读并同意</span>
                    <span class="text-#FE854E">《隐私政策》</span>
                    <span>和</span>
                    <span class="text-#FE854E">《用户协议》</span>
                </div>
            </div>
            <div class="wfull h200 flex-col items-center mb100">
                <div class="w300">
                    <nut-divider style="--nut-divider-text-color: #A4A4A4;--nut-divider-text-font-size:24rpx">第三方登录</nut-divider>
                </div>
                <div class="wull flex items-center justify-around">
                    <div class="size-64 b-rd-full bg-#28C445 flex-center">
                        <span i-uiw:weixin class="text-#fff size-40"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/login-bj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.sanjiao {
    position: relative;
    &::after {
        content: " ";
        position: absolute;
        bottom: 99%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-bottom: 30px solid #fff; /* 控制三角形颜色 */
        filter: blur(2rpx);
    }
}
</style>
