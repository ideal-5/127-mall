<script setup lang="ts">
import { useUserStore } from "@/store";
import { configGetAgreementApi, configGetVipConfigApi, userBuyVipApi } from "@/api";
import type { Config } from "@/api";
import { useStyle } from "@/hooks/useStyle";

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);

const userStore = useUserStore();

/**
 * 获取vip配置
 */
const vipConfig = ref<Config.ConfigVip>();
onMounted(async () => {
    let { body } = await configGetVipConfigApi();
    vipConfig.value = body;
});
/**
 * vip权益
 */
const vipText = ref<Config.AgreementResult>();
onMounted(async () => {
    let { body } = await configGetAgreementApi({ type: "90" });
    vipText.value = body;
});

/**
 * 支付方式
 */
const activePayType = ref("20");
const payType = ref([
    { label: "微信支付", value: "20", icon: "i-ri:wechat-pay-fill", color: "#3BCA72" },
    { label: "支付宝支付", value: "10", icon: "i-ri:alipay-fill", color: "#1296DB" },
    { label: "银行卡支付", value: "30", icon: "i-ri:bank-card-fill", color: "#FFB346" },
]);

const showSubmitPopup = ref(false);

/**
 * 购买
 */
const toast = useToast();
async function payVip() {
    await userBuyVipApi({ payType: activePayType.value });
    await userStore.refreshUserInfo();
    showSubmitPopup.value = false;
    toast.success("购买成功");
}
</script>

<template>
    <div class="main box-border px-32" :style="{ paddingBottom: bottomHeight }">
        <div
            class="bg-[linear-gradient(180deg,#FF9113_0%,#FFEDC4_100%)] size-1206 b-rd-full fixed top-0 left-50% translate-[-50%,-70%] z--1"
        ></div>
        <NavBar barColor="#fff">会员中心</NavBar>

        <div class="bg w100% h402 box-border p40 mt60 flex-col justify-between">
            <div flex items-center>
                <div size-104 mr32>
                    <image :src="userStore.user?.headImage" mode="aspectFill" class="size-full b-rd-full" />
                </div>
                <div>
                    <div text-34 fw500 mb10>{{ userStore.user?.userName }}</div>
                    <div text-26>{{ userStore.user?.phone }}</div>
                </div>
            </div>
            <div class="wfull flex items-center justify-between">
                <div fw500 text-26 v-if="userStore.user?.vipStatus === '20'">
                    到期时间 ：{{ userStore.user.vipTime }}
                </div>
                <div
                    class="bg-[rgba(0,0,0,0.60)] text-22 text-#fff b-rd-full box-border py8 px15 flex-center"
                    @click="showSubmitPopup = true"
                >
                    <span>{{ userStore.user?.vipStatus === "20" ? "立即续费" : "开通会员" }}</span>
                    <span i-mdi:chevron-right></span>
                </div>
            </div>
        </div>

        <div class="shadow-[0rpx_6rpx_12rpx_0rpx_rgba(0,0,0,0.1608)] wfull b-rd-20 mt34 box-border p32">
            <div flex items-center mb25>
                <div class="bg-[linear-gradient(180deg,#FECE62_0%,#FF9113_100%)] w8 h36 b-rd-full mr18"></div>
                <div text-26 fw500>{{ vipText?.name }}</div>
            </div>
            <rich-text :nodes="vipText?.policy"></rich-text>
        </div>
        <div :style="bottomStyle" class="flex-center">
            <div class="w634 h74 bg-#FF9113 b-rd-full flex-center text-#fff" @click="showSubmitPopup = true">
                {{ userStore.user?.vipStatus === "20" ? "立即续费" : "开通会员" }}
            </div>
        </div>
    </div>
    <nut-popup
        position="bottom"
        :z-index="60"
        :custom-style="{
            display: 'flex',
            'flex-direction': 'column',
        }"
        v-model:visible="showSubmitPopup"
        round
        lock-scroll
        closeable
    >
        <div class="flex-1 min-h-0 wfull overflow-scroll">
            <!--   position: "sticky",
            top: top ? topValue[top] : "0px",
            "z-index": 10, -->
            <div class="h100 wfull flex justify-end items-center box-border px32 sticky top-0 bg-white flex-center">
                <span text-32 fw500>购买会员</span>
            </div>

            <!-- 商品 -->
            <div class="wfull box-border px32 my50">
                <div class="wfull flex items-center justify-between b-b-solid b-1rpx b-#EFEFEF box-border py15">
                    <div>会员:</div>
                    <div>{{ vipConfig?.vipName }}</div>
                </div>
                <div class="wfull flex items-center justify-between b-b-solid b-1rpx b-#EFEFEF box-border py15">
                    <div>价格:</div>
                    <div>￥{{ vipConfig?.amount }}</div>
                </div>
                <div class="wfull flex items-center justify-between b-b-solid b-1rpx b-#EFEFEF box-border py15">
                    <div>时长:</div>
                    <div>{{ vipConfig?.time }}天</div>
                </div>
            </div>

            <!-- 支付方式 -->
            <div class="wfull flex-col justify-between box-border">
                <div
                    class="wfull flex items-center justify-between box-border py15 b-b-solid b-1rpx b-#F2F2F2 box-border p-x32"
                    v-for="(item, index) in payType"
                    :key="index"
                    @click="activePayType = item.value"
                >
                    <div class="flex-center">
                        <div class="size-50 mr32">
                            <span size-full :class="item.icon" :style="{ color: item.color }"></span>
                        </div>
                        <div>
                            <span class="fw500 text-26">{{ item.label }}</span>
                        </div>
                    </div>
                    <div>
                        <div
                            class="size-35 b-1rpx b-solid b-rd-full flex-center transition"
                            :class="activePayType === item.value ? 'bg-#FFAA48 b-#FFAA48' : 'b-#AEAEAE'"
                        >
                            <span i-mdi:check text-white v-if="activePayType === item.value"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wfull h120 flex-center box-border px32">
            <div
                class="bg-[linear-gradient(109deg,#FFAA48_0%,#FF9113_100%)] wfull h92 fw500 flex-center text-#fff b-rd-16"
                @click="payVip"
            >
                <span>购买</span>
            </div>
        </div>
    </nut-popup>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/vip-center-bj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
