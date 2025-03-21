<script setup lang="ts">
import { gotoPage, showToast } from "@/utils/uni";
import { ref } from "vue";

const codeInp = ref("");

const codeFinish = () => {
    console.log("codeInp", codeInp);
    // 调用接口

    let code = 1;
    if (code === 1) {
        // code正确 跳转页面
        gotoPage("edit-phone-change");
    } else {
        showToast({ title: "验证码错误" });
    }
};
</script>

<template>
    <div
        class="main bg-[linear-gradient(183deg,#FFDBB8_0%,#FFEDC4_20%,#FCFCFC_45%,#FCFCFC_60%,#FCFCFC_100%)] flex flex-col justify-end"
    >
        <NavBar> 获取验证码 </NavBar>
        <div class="flex-1 flex items-center">
            <div class="flex flex-col ml-66">
                <span class="text-34 font500">验证码已发送至：</span>
                <span class="text-34 font500 text-#FF9113"> 191****0101</span>
            </div>
        </div>
        <div class="h-70vh w-full bg-#fff b-rd-tr-26 b-rd-tl-26 flex flex-col items-center">
            <div class="h-200 text-34 text-#FFAA48 text-align-center flex items-center justify-center">输入验证码</div>
            <nut-code-input
                v-model="codeInp"
                focus
                border-color="#FFAA48"
                size="50"
                maxlength="6"
                @finish="codeFinish"
            />
        </div>
    </div>
</template>


<style scoped lang="scss"></style>
