<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { gotoPage } from "@/utils/uni";
import { useUserStore } from "@/store";
import { configGetAgreementApi } from "@/api";
import type { Config } from "@/api";

const userStore = useUserStore();

const logoutClick = () => {
    userStore.token = "";
    uni.reLaunch({
        url: "/pages/login/login",
    });
};

const showProps = ref(false);
const popupInfo = ref<Config.AgreementResult>();
const popupInfoList = ref<Config.AgreementResult[]>([]);

let agreementParams = ref<Config.AgreementParams["type"][]>(["40"]);

onMounted(async () => {
    let resList = await Promise.all(
        agreementParams.value.map(async (type) => {
            let { body } = await configGetAgreementApi({ type });
            return body;
        })
    );
    popupInfoList.value = resList;
});

const showPopupFun = (type: Config.AgreementParams["type"]) => {
    let index = agreementParams.value.indexOf(type);
    if (index !== -1) {
        popupInfo.value = popupInfoList.value[index];
        showProps.value = true;
    }
};

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);
</script>

<template>
    <div class="main bg-#F3F3F3 box-border" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff">设置</NavBar>

        <div class="bg-#fff mt12 box-border px30 pb-30">
            <div class="line">
                <span class="label">消息通知</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
            <div class="line">
                <span class="label">隐私设置</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
            <div class="line">
                <span class="label">语言切换</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
            <div class="line">
                <span class="label">退换货政策</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
            <div class="line">
                <span class="label">版本更新</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
            <div class="line" @click="showPopupFun('40')">
                <span class="label">关于我们</span>
                <span class="i-mdi:chevron-right icon"></span>
            </div>
        </div>

        <div class="flex-center !bg-transparent" :style="bottomStyle">
            <div class="w700 h80 flex-center text-#fff text-32 bg-#FFAA48 b-rd-full" @click="logoutClick">退出登录</div>
        </div>
    </div>
    <nut-popup v-model:visible="showProps" transition="zoom" pop-class="w600 px-25 flex flex-col items-center b-rd-22">
        <div
            class="bg-[linear-gradient(95deg,#FECE62_0%,#FFFFFF_18%,#FFFFFF_47%,#FFFFFF_82%,#FECE62_100%)] text-34 text-#FF9113 b-rd-full px-20 my-30"
        >
            {{ popupInfo?.name }}
        </div>
        <rich-text :nodes="popupInfo?.policy"></rich-text>
    </nut-popup>
</template>

<style scoped lang="scss">
.line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #cdcdcd;

    .label {
        font-size: 26rpx;
    }
    .icon {
        color: #999797;
    }
}
</style>
