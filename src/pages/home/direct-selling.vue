<script setup lang="ts">
import { ref } from "vue";
import { directSellingTypeApi, directSellingProductListApi, directSellingCreateOrderApi } from "@/api";
import type { DirectSelling } from "@/api";
import { useSelectAddress } from "@/hooks/useSelectAddress";

const searchValue = ref("");

const tabList = ref<DirectSelling.Sort[]>();

const activeTab = ref<number>();

onMounted(async () => {
    let { body } = await directSellingTypeApi();
    tabList.value = body;
    activeTab.value = tabList.value[0].id;
});

const paging = {
    page: 1,
    limit: 10,
};
const list = ref<DirectSelling.Product[]>([]);
async function getList(isPush: boolean = false) {
    let { data } = await directSellingProductListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        merchName: searchValue.value,
        sortId: activeTab.value || 0,
    });
    if (isPush) {
        if (data.length === 0) return;
        list.value.push(...data);
    } else {
        list.value = data;
    }
}

watch(
    () => activeTab.value,
    () => {
        getList(false);
    }
);

/**
 * 支付弹窗
 */
const showSubmitPopup = ref(false);
const activeProduct = ref<DirectSelling.Product>();
const remarkInp = ref("");
const activePayType = ref("20");
const payType = ref([
    { label: "微信支付", value: "20", icon: "i-ri:wechat-pay-fill", color: "#3BCA72" },
    { label: "支付宝支付", value: "10", icon: "i-ri:alipay-fill", color: "#1296DB" },
    { label: "银行卡支付", value: "30", icon: "i-ri:bank-card-fill", color: "#FFB346" },
]);
// 地址
const { activeAddress, selectAddress } = useSelectAddress();

function openSubmitPopup(item: DirectSelling.Product) {
    if (!item) return;
    activeProduct.value = item;
    showSubmitPopup.value = true;
    remarkInp.value = "";
}
const toast = useToast();
async function submitOrder() {
    if (!activeProduct.value || !activeAddress.value) return;
    await directSellingCreateOrderApi({
        id: activeProduct.value?.id,
        addressId: activeAddress.value?.id,
        payType: activePayType.value,
        remark: remarkInp.value,
    });
    toast.success("订单创建成功");
    showSubmitPopup.value = false;
}
</script>

<template>
    <div class="main h100vh flex flex-col">
        <NavBar isEmptyFill isBackIconFill backColor="#fff">
            <template #left>
                <div class="wfull hfull flex items-center box-border pr-30">
                    <span class="text-42 text-#fff mx-10 whitespace-nowrap">厂家批发</span>
                    <nut-searchbar
                        v-model="searchValue"
                        style="
                            --nut-searchbar-input-height: 70rpx;
                            --nut-searchbar-input-border-radius: 14rpx;
                            --nut-searchbar-padding: 0;
                            --nut-searchbar-background: transparent;
                            --nut-searchbar-input-background: #fff;
                        "
                        @search="getList(false)"
                        @clear="getList(false)"
                    >
                        <template #leftin>
                            <div class="size-40 flex-center" @click="getList(false)">
                                <span class="i-mdi:magnify text-#000 size-40"></span>
                            </div>
                        </template>
                    </nut-searchbar>
                </div>
            </template>
        </NavBar>
        <!-- 上方背景图 -->
        <div class="bg wfull h398 relative z--1 flex-shrink-0">
            <div
                class="w310 h168 border-solid border-4 border-#154BD2 b-rd-16 bg-#fff absolute bottom-45 right-30 flex items-center justify-around"
            >
                <div class="w118 h116 relative" v-for="(item, index) in 2" :key="index">
                    <image
                        :src="`https://picsum.photos/700/350?random=${Math.random()}`"
                        mode="aspectFill"
                        class="size-full"
                    />
                    <div
                        class="text-#EC3013 absolute top-[100%] left-[50%] translate-[-50%] bg-#FEEAE7 b-rd-full box-border px15 py5 flex items-center"
                    >
                        <span class="text-14">￥</span>
                        <span class="text-20">6.99</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wfull box-border px-30 mt--34 flex-1 min-h-0 flex flex-col">
            <!-- 今日热销 -->
            <div
                class="w-full bg-[linear-gradient(180deg,#D8F1FF_0%,#FFFDF9_44%,#FFFFFF_95%,#FFF5DF_100%)] b-rd-16 box-border px20 py30 flex-shrink-0"
            >
                <div class="wfull flex items-center justify-between mb30">
                    <image src="@/static/img/jinrirexiao-text.png" class="w126 h34" />
                    <span text="20">2万人正在热抢...</span>
                </div>
                <div class="wfull flex items-center justify-around">
                    <div
                        class="w146 h202 bg-#fff b-rd-12 b-solid b-#FFAA48 b-2 relative"
                        v-for="(item, index) in 4"
                        :key="index"
                    >
                        <image
                            :src="`https://picsum.photos/700/350?random=${Math.random()}`"
                            mode="aspectFill"
                            class="size-full b-rd-12"
                        />
                        <div class="absolute top-0 left-0 bg-#FEEAE7 b-rd-full text-14 text-#EC3013">热销5万+</div>
                        <div
                            class="text-#EC3013 absolute top-[100%] left-[50%] translate-[-50%] bg-#FEEAE7 b-rd-full box-border px15 py5 flex items-center"
                        >
                            <span class="text-14">￥</span>
                            <span class="text-20">6.99</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 min-h0 wfull flex flex-col">
                <div class="wfull h100 flex items-center overflow-scroll">
                    <div
                        class="flex-center text-26 box-border px15 py5 b-rd-full mr20 whitespace-nowrap transition"
                        :class="activeTab === item.id ? 'text-#EC3013 bg-#FEEAE7' : 'text-#AEAEAE bg-#EBEBEB'"
                        v-for="(item, index) in tabList"
                        @click="activeTab = item.id"
                    >
                        {{ item.name }}
                    </div>
                </div>
                <div class="flex-1 min-h0 wfull">
                    <scroll-view scroll-y class="wfull hfull overflow-scroll" @scrolltolower="getList(true)">
                        <div class="wfull flex mb30" v-for="(item, index) in list">
                            <div class="size-220 flex-shrink-0">
                                <image :src="item.skuImage" mode="aspectFill" class="b-rd-10 size-full" />
                            </div>
                            <div class="flex-1 min-w-0 box-border pl-44">
                                <div class="text-30 font-500">{{ item.skuName }}</div>
                                <div class="wfull flex items-center mt20">
                                    <nut-progress
                                        :percentage="(item.saleCount / item.totalCount) * 100"
                                        :show-text="false"
                                        style="--nut-progress-outer-background-color: #feeae7"
                                        status="active"
                                    />
                                    <div class="text-#AEAEAE text-20 whitespace-nowrap ml25 mr35">
                                        已售{{ item.totalSaleCount }}
                                    </div>
                                </div>
                                <div class="wfull flex items-center my-20 overflow-scroll">
                                    <div
                                        class="text-22 mr10 text-#EC3013 b-1 b-solid b-#EC3013 b-rd-4 flex-center box-border px5 py3 whitespace-nowrap"
                                        v-for="it in item.properties"
                                        :key="it.id"
                                    >
                                        {{ it.value }}
                                    </div>
                                </div>
                                <div class="wfull flex items-center">
                                    <div class="flex-1 min-w-0 bg-#FEEAE7 h58 b-rd-8 text-#EC3013 flex items-center">
                                        <div class="font-500 mx15">
                                            <span class="text-22">￥</span>
                                            <span class="text-32">{{ item.price }}</span>
                                        </div>
                                        <div class="text-18">券后价</div>
                                    </div>
                                    <div
                                        class="h58 w94 bg-#EC3013 text-38 text-#fff flex-center b-rd-8 flex-shrink-0 ml8"
                                        @click="openSubmitPopup(item)"
                                    >
                                        抢
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </div>
        </div>
    </div>
    <!-- 支付弹窗 -->
    <nut-popup
        position="bottom"
        :z-index="100"
        :custom-style="{
            height: '80vh',
            display: 'flex',
            'flex-direction': 'column',
        }"
        v-model:visible="showSubmitPopup"
        round
        lock-scroll
    >
        <div class="flex-1 min-h-0 wfull overflow-scroll">
            <!--   position: "sticky",
            top: top ? topValue[top] : "0px",
            "z-index": 10, -->
            <div class="h100 wfull flex justify-end items-center box-border px32 sticky top-0 bg-white">
                <span i-mdi:close @click="showSubmitPopup = false"></span>
            </div>
            <!-- 地址 -->
            <div
                class="wfull flex items-center h-fit b-b-solid b-b-4rpx b-b-#F2F2F2 box-border py20"
                @click="selectAddress"
            >
                <div class="flex-1 min-w-0 flex hfull flex items-center">
                    <div class="w100 hfull flex-center flex-shrink-0">
                        <span i-mdi:map-marker-radius></span>
                    </div>
                    <div class="fw500 text-30 flex-1 min-w-0">
                        <template v-if="activeAddress">
                            <div mb8>{{ activeAddress?.address }}</div>
                            <div>{{ activeAddress?.doorplate }}</div>
                            <div class="text-#949494 text-22 mt15">
                                <span mr20>{{ activeAddress?.contactName }}</span>
                                <span>{{ activeAddress?.contactPhone }}</span>
                            </div>
                        </template>
                        <template v-else>
                            <span>请选择地址</span>
                        </template>
                    </div>
                </div>
                <div class="w100 hfull flex-center flex-shrink-0">
                    <span i-mdi:chevron-right></span>
                </div>
            </div>
            <!-- 商品 -->
            <div class="wfull box-border py32 flex box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2" v-if="activeProduct">
                <div size-190 flex-shrink-0 mr32>
                    <image :src="activeProduct.skuImage" mode="aspectFill" class="size-190 b-rd-12 bg-fuchsia" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center">
                        <div class="text-#EC3013 fw500 mr32">
                            <span text-28>￥</span>
                            <span text-42>{{ activeProduct.price }}</span>
                        </div>
                        <!-- <div class="text-#949494 text-24 line-through">￥19.99</div> -->
                    </div>
                    <!-- <div text-26 my28>已选: {{ activeSpecificationInfo.skuName }}</div>
                    <nut-input-number v-model="submitCount"></nut-input-number> -->
                </div>
            </div>

            <!-- 订单备注 -->
            <div class="wfull flex-col justify-between box-border p32 b-b-solid b-b-6rpx b-b-#F2F2F2">
                <div text-26 fw500 mb20>订单备注</div>
                <!-- <div i-mdi:chevron-right></div> -->
                <nut-textarea v-model="remarkInp" limit-show max-length="200" />
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
                @click="submitOrder"
            >
                <span text-28>立即支付</span>
                <span text-34>￥{{ activeProduct?.price }}</span>
            </div>
        </div>
    </nut-popup>
</template>

<style scoped lang="scss">
.bg {
    background: url("@/static/bj/direct-selling-bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
}
:deep(.nut-textarea) {
    padding: 18rpx;
    background-color: #f6f6f7 !important;
    border-radius: 10rpx;
}
</style>
