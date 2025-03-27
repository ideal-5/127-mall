<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { userGetUserScoreApi, userGetUserInviteAndIncomeApi, configGetAgreementApi } from "@/api";
import type { User, Config } from "@/api";

const userScore = ref<User.UserScore>();
onMounted(async () => {
    let { body } = await userGetUserScoreApi();

    userScore.value = body;
});
const UserInviteAndIncome = ref<User.UserInviteAndIncome>();
onMounted(async () => {
    let { body } = await userGetUserInviteAndIncomeApi();
    UserInviteAndIncome.value = body;
});

const agreement = ref<Config.AgreementResult>();
onMounted(async () => {
    let { body } = await configGetAgreementApi({ type: "70" });
    agreement.value = body;
});

const userStore = useUserStore();
const showProps = ref(false);
</script>

<template>
    <div
        class="main bg-[linear-gradient(183deg,#FFDBB8_0%,#FFEDC4_13%,#FCFCFC_36%,#FCFCFC_52%,#FCFCFC_100%)] box-border px-34"
    >
        <NavBar>
            <template #left>
                <div class="w100% flex-center relative">
                    <span class="text-34 font-400">我的分销</span>
                    <span class="text-26 absolute right-30" @click.stop="showProps = true">分销规则</span>
                </div>
            </template>
        </NavBar>
        <div class="wfull flex items-center mt-20 mb-30">
            <div class="mr-22">
                <image :src="userStore.user?.headImage" mode="aspectFill" class="size-100 b-rd-full" />
            </div>
            <div class="bg-#FECE62 b-rd-full text-#fff font-500 text-22 box-border px-25 py-15">
                <span>邀请码:</span>
                <span>{{ userStore.user?.unCode }}</span>
            </div>
        </div>
        <div
            class="bg-[linear-gradient(180deg,#FECE62_0%,#FFEDC4_10%,#FFFFFF_21%,#FFFFFF_100%)] box-border p-25 b-rd-14"
        >
            <div class="flex items-center justify-between my-25">
                <div class="font-500">
                    <span class="text-28">账户余额</span>
                    <span class="text-34">￥{{ userScore?.balance }}</span>
                </div>
                <div
                    class="bg-[linear-gradient(101deg,#FECE62_0%,#FFAA48_100%)] text-#fff text-22 box-border px-20 py-10 b-rd-full"
                    @click="gotoPage('withdraw')"
                >
                    立即提现
                </div>
            </div>
            <div class="wfull border-b-solid border-b-1 border-b-#EBEBEB flex box-border py-30">
                <div class="flex-1 flex-col items-center border-r-solid border-r-1 border-r-#EBEBEB">
                    <span class="text-26 text-#828282 mb-20">累计收益（元）</span>
                    <span class="text-34 font-500">{{ UserInviteAndIncome?.amount }}</span>
                </div>
                <div class="flex-1 flex-col items-center">
                    <span class="text-26 text-#828282 mb-20">邀请人数（人）</span>
                    <span class="text-34 font-500">{{ UserInviteAndIncome?.invite || "-" }}</span>
                </div>
            </div>
            <div class="wfull flex items-center mt-35">
                <!-- <div class="flex-1 flex-center text-26">本月累计收益:</div> -->
                <div class="flex-1 flex-center text-26">邀请总人数: {{ UserInviteAndIncome?.invite || "" }}</div>
            </div>
        </div>
        <nut-popup
            v-model:visible="showProps"
            transition="zoom"
            pop-class="w600 px-25 flex flex-col items-center b-rd-22"
        >
            <div
                class="bg-[linear-gradient(95deg,#FECE62_0%,#FFFFFF_18%,#FFFFFF_47%,#FFFFFF_82%,#FECE62_100%)] text-34 text-#FF9113 b-rd-full px-20 my-30"
            >
                {{ agreement?.name }}
            </div>
            <rich-text :nodes="agreement?.policy"></rich-text>
        </nut-popup>
    </div>
</template>

<style scoped lang="scss"></style>
