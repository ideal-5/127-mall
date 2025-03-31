<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import { onShow } from "@dcloudio/uni-app";
import { userGetUserScoreAndCouponApi, pointsProductListApi, configGetAgreementApi, pointsDetailApi } from "@/api";
import type { User, Points, Config } from "@/api";
import { gotoPage } from "@/utils/uni";

const tabList = ref([
    { name: "积分兑换", id: "1" },
    { name: "积分明细", id: "2" },
]);
const activeTab = ref(0);

const scoreAndCoupon = ref<User.UserScoreAndCouponResult>();
onShow(async () => {
    let { body } = await userGetUserScoreAndCouponApi();
    scoreAndCoupon.value = body;
});
const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();
const paging = ref({
    page: 1,
    limit: 8,
});
const getList = async (isPush: boolean = false) => {
    let { data } = await pointsProductListApi({
        page: isPush ? paging.value.page + 1 : 1,
        limit: paging.value.limit,
    });
    if (isPush) {
        if (WaterfallsFlowRef.value) {
            let complete = await WaterfallsFlowRef.value.pushData(
                data.map((item) => ({ ...item, img: item.imageUrl }))
            );
            complete && paging.value.page++;
        }
    } else {
        if (WaterfallsFlowRef.value) {
            WaterfallsFlowRef.value.clearList();
            await WaterfallsFlowRef.value.pushData(data.map((item) => ({ ...item, img: item.imageUrl })));
        }
    }
};

onMounted(() => {
    getList(false);
});
watch(
    () => activeTab.value,
    () => {
        nextTick(() => {
            if (activeTab.value === 0) {
                getList(false);
            }
        });
    }
);

const popupInfo = ref<Config.AgreementResult>();
onMounted(async () => {
    let { body } = await configGetAgreementApi({ type: "80" });
    popupInfo.value = body;
});

const showProps = ref(false);

/**
 * 积分明细
 */
const listPaging = {
    page: 1,
    limit: 8,
};
onMounted(() => {
    getDetailList();
});

async function getDetailList(isPush: boolean = false) {
    await pointsDetailApi({
        page: isPush ? listPaging.page + 1 : 1,
        limit: listPaging.limit,
    });
}
</script>

<template>
    <div class="main h100vh flex-col">
        <NavBar isEmptyFill>
            <template #left>
                <div class="wfull hfull flex-center relative">
                    <span class="text-34">积分兑换</span>
                    <span class="text-26 absolute right-20" @click.stop="showProps = true">活动规则</span>
                </div>
            </template>
        </NavBar>
        <div class="bg wfull h618 flex items-center box-border px-32 flex-shrink-0">
            <div class="flex-col mb100">
                <div class="flex-center mb26">
                    <image class="size-40 mr5" src="@/static/img/gold-icon.png" mode="aspectFill" />
                    <span class="text-30 font-500">当前可用积分</span>
                </div>
                <div class="text-48">{{ scoreAndCoupon?.coin }}</div>
            </div>
        </div>
        <div class="wfull flex-1 min-h-0 box-border px-32 -mt-245">
            <div class="wfull hfull b-rd-t-26 bg-#fff flex-col">
                <div class="wfull h100 b-b-1 b-b-#EFEFEF b-b-solid flex items-center flex-shrink-0">
                    <Tabs
                        :tabList="tabList"
                        keyName="name"
                        v-model:activeTab="activeTab"
                        style="--tabs-line-bagcolor: #ffaa48"
                    ></Tabs>
                </div>
                <div class="flex-1 min-h-0 wfull box-border pt20">
                    <scroll-view class="wfull hfull overflow-scroll" scroll-y @scrolltolower="getList(true)">
                        <!-- 商品列表 -->
                        <WaterfallsFlow
                            ref="WaterfallsFlowRef"
                            :key="activeTab"
                            v-if="activeTab === 0"
                            @itemClick="
                                (item) => {
                                    gotoPage(`/pages/product/point-details?id=${item.id}`);
                                }
                            "
                        >
                            <template #text="{ item }">
                                <div class="bg-#fff b-rd-b-16 box-border p-16">
                                    <div class="text-24">{{ item.merchName }}</div>
                                    <div>
                                        <span class="font-500 text-18"></span>
                                        <span class="text-24 fw-500 text-#FF9113">{{ item.coin }}积分</span>
                                    </div>
                                    <!-- <div class="flex items-center">
                                        <div class="flex items-center border-1 border-#000 border-solid">
                                            <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                            <span class="text-12 mx-10">省{{ item.vprice }}</span>
                                        </div>
                                    </div> -->
                                </div>
                            </template>
                        </WaterfallsFlow>
                        <!-- 积分明细 -->
                        <div v-if="activeTab === 1" class="hfull wfull box-border px30">
                            <div
                                class="wfull flex items-center justify-between b-b-solid b-b-#EFEFEF b-b-1rpx box-border py20"
                                v-for="(item, index) in 30"
                                :key="index"
                            >
                                <div class="flex-col">
                                    <span class="text-26 font-500 mb8">观看视频</span>
                                    <span class="text-20 text-#AEAEAE">2024/12/19 14:21:34</span>
                                </div>
                                <div class="text-30 text-#FF9113 font-500">+30</div>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </div>
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
.bg {
    background: url("@/static/bj/point-bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
}
</style>
