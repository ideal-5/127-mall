<script setup lang="ts">
import { ref, nextTick } from "vue";
import { userSigninApi } from "@/api";
import { useUserStore } from "@/store";
import { gotoPage } from "@/utils/uni";

const toast = useToast();
const userStore = useUserStore();


const params = ref({
    phone: "19121140161",
    password: "123456",
    msgCode: "",
});

const countdownRef = ref();

const isSendCode = ref(true); // 是否显示发送验证码
const startSendCode = () => {
    isSendCode.value = false;
    nextTick(() => {
        countdownRef.value.start();
    });
};
// 倒计时结束
const countdownEnd = () => {
    countdownRef.value.reset();
    isSendCode.value = true;
};
// const isAccredit = ref(false);
const loginClick = async () => {
    if (params.value.phone === "") return toast.text("请输入手机号");
    if (params.value.password === "") return toast.text("请输入密码");
    if (params.value.msgCode === "") return toast.text("请输入验证码");
    // if (!isAccredit.value) return toast.text("请先阅读并同意《隐私政策》和《用户协议》");

    let { accessToken, code, body } = await userSigninApi(params.value);
    if (code && accessToken) {
        userStore.token = accessToken;
        userStore.user = body;
        toast.loading("注册并成功!跳转中...", {
            duration: 800,
        });
        setTimeout(() => {
            uni.switchTab({
                url: "/pages/home/home",
            });
        }, 1000);
    }
};
</script>

<template>
    <div class="main flex-col">
        <div class="bg wfull h522 text-52 fw500 flex-col justify-center box-border pl30 flex-shrink-0">
            <span>你好, </span>
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
                            v-model="params.phone"
                            placeholder="请输入您的手机号"
                            style="--nut-input-padding: 10px 0"
                        ></nut-input>
                    </div>
                    <div mb30>
                        <div class="flex items-center">
                            <span class="i-mdi:shield-check-outline size-34 mr18"></span>
                            <span class="text-28 fw500">验证码</span>
                        </div>
                        <nut-input
                            v-model="params.msgCode"
                            placeholder="请输入您的验证码"
                            style="--nut-input-padding: 10px 0"
                        >
                            <template #right>
                                <div class="text-#1192EB text-24" @click="startSendCode" v-show="isSendCode">
                                    获取验证码
                                </div>
                                <div v-show="!isSendCode">
                                    <nut-countdown
                                        format="mm:ss"
                                        :time="60000"
                                        :auto-start="false"
                                        ref="countdownRef"
                                        @on-end="countdownEnd"
                                    ></nut-countdown>
                                </div>
                            </template>
                        </nut-input>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <span class="i-mdi:lock-outline size-34 mr18"></span>
                            <span class="text-28 fw500">密码</span>
                        </div>
                        <nut-input
                            v-model="params.password"
                            placeholder="请输入您的密码"
                            style="--nut-input-padding: 10px 0"
                        ></nut-input>
                    </div>
                </div>
                <div
                    class="bg-[linear-gradient(247deg,#FF9113_0%,#FECE62_100%)] text-30 w524 h76 shadow-[0rpx,6rpx,12rpx,0rpx,#FFDBB8] b-rd-full flex-center"
                    @click="loginClick"
                >
                    注册
                </div>
                <!-- <div class="mt54 text-20 flex items-center" @click="isAccredit = !isAccredit">
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
                </div> -->
                <div text-20 mt50>
                    <span>已有账号？</span>
                    <span underline @click="gotoPage('login')">立即登录</span>
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
