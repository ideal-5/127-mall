<script setup lang="ts">
import { OrderDetailApi, productIdApi } from "@/api";
import type { Order } from "@/api";
import { onLoad } from "@dcloudio/uni-app";
import ReviewPopup from "./components/ReviewPopup.vue";

const productList = ref<Order.DetailProductDetail[]>();
const orderInfo = ref<Order.DetailOrderInfo & { statusText: string }>();

// 10未支付 20已支付 30已完成 40已发货 50已完成 60已评论 90拼团中 70退款
const tabList = ref([
    { name: "全部", value: "" },
    { name: "未支付", value: "10" },
    { name: "已支付", value: "20" },
    { name: "代发货", value: "30" },
    { name: "已发货", value: "40" },
    { name: "已完成", value: "50" },
    { name: "已评论", value: "60" },
    { name: "拼团中", value: "90" },
    { name: "退款/售后", value: "70" },
]);
const orderId = ref<number>();
onLoad(async (query) => {
    if (!query?.id) return;
    orderId.value = query.id as number;
    getDetail();
});
async function getDetail() {
    if (!orderId.value) return;
    let { body } = await OrderDetailApi({ id: orderId.value });
    productList.value = body.detail;
    let tab = tabList.value.find((tab) => tab.value === body.orderInfo.status);
    orderInfo.value = { ...body.orderInfo, statusText: tab?.name || "未知" };
}
/**
 * 评论
 */
const reviewShow = ref(false);
const activeOrderId = ref<number | null>(null); // 子订单id
const activeProductId = ref<number>(); // 商品id
watch(
    () => reviewShow.value,
    () => {
        if (!reviewShow.value) {
            getDetail(); // 关闭评论弹窗时刷新一下订单详情
        }
    }
);
async function reviewClick(item: Order.DetailProductDetail) {
    if (!item?.skuId || !item?.id) return;
    let { body } = await productIdApi({ skuId: item.skuId });
    activeOrderId.value = item?.id;
    activeProductId.value = body as number;
    reviewShow.value = true;
}
</script>

<template>
    <div class="main">
        <NavBar>订单详情</NavBar>
        <div class="wfull box-border px32 fw500 text-26 text-#FFAA48">{{ orderInfo?.statusText }}</div>
        <!-- 地址 -->
        <div class="wfull flex items-center h-fit b-b-solid b-b-10rpx b-b-#F2F2F2 box-border py20">
            <div class="flex-1 min-w-0 flex hfull flex items-center">
                <div class="w100 hfull flex-center flex-shrink-0">
                    <span i-mdi:map-marker-radius></span>
                </div>
                <div class="fw500 text-30 flex-1 min-w-0">
                    <div mb8>{{ orderInfo?.address }}</div>
                    <!-- <div>{{ orderInfo?.doorplate }}</div> -->
                    <div class="text-#949494 text-22 mt15">
                        <span mr20>{{ orderInfo?.contactName }}</span>
                        <span>{{ orderInfo?.contactPhone }}</span>
                    </div>
                </div>
            </div>
            <div class="w100 hfull flex-center flex-shrink-0">
                <span i-mdi:chevron-right></span>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="wfull box-border px32">
            <div class="wfull" v-for="(item, index) in productList" :key="item.id">
                <div wfull flex-c>
                    <div class="flex-1 min-w-0 flex mt20">
                        <div size-152 flex-shrink-0 mr20>
                            <image class="size-full b-rd-8" :src="item.skuImage || ''" mode="aspectFill" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div fw500 text-28 truncate-1>{{ item?.skuName }}</div>
                            <div class="text-24 text-#949494 truncate-1">{{ item.skuName }}</div>
                            <div class="wfull flex justify-between">
                                <div class="text-#EC3013 fw500">
                                    <span text-20>￥</span>
                                    <span text-30>{{ (item.originalAmount || 0) * (item.stock || 0) }}</span>
                                </div>
                                <div>X{{ item.stock }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wfull flex justify-end">
                    <div class="order-btn" v-if="item.status === '50'" @click.stop="reviewClick(item)">评论</div>
                </div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="wfull box-border px32 mt30" v-if="orderInfo">
            <div class="line">
                <div class="label">商品总价</div>
                <div class="value">1213</div>
            </div>
            <div class="line">
                <div class="label">订单编号</div>
                <div class="value">{{ orderInfo.orderId }}</div>
            </div>
            <div class="line" v-if="orderInfo.logisticsCode">
                <div class="label">物流</div>
                <div class="value">{{ orderInfo.logisticsCode }}</div>
            </div>
            <div class="line" v-if="orderInfo.logisticsOrder">
                <div class="label">物流单号</div>
                <div class="value">{{ orderInfo.logisticsOrder }}</div>
            </div>
            <div class="line" v-if="orderInfo.freightAmount">
                <div class="label">运费</div>
                <div class="value">{{ orderInfo.freightAmount }}</div>
            </div>
            <div class="line" v-if="orderInfo.originalAmount">
                <div class="label">原价</div>
                <div class="value">￥{{ orderInfo.originalAmount }}</div>
            </div>
            <div class="line" v-if="orderInfo.couponAmount">
                <div class="label">优惠扣减金额</div>
                <div class="value">￥{{ orderInfo.couponAmount }}</div>
            </div>
            <div class="line" v-if="orderInfo.currentAmount">
                <div class="label">实付</div>
                <div class="value">￥{{ orderInfo.currentAmount }}</div>
            </div>
            <div class="line" v-if="orderInfo.createTime">
                <div class="label">创建时间</div>
                <div class="value">{{ orderInfo.createTime }}</div>
            </div>
            <div class="line" v-if="orderInfo.payTime">
                <div class="label">支付时间</div>
                <div class="value">{{ orderInfo.payTime }}</div>
            </div>
            <div class="wfull flex-col justify-between my15" v-if="orderInfo.remark">
                <div text-26 fw500 mb20>订单备注</div>
                <!-- <div i-mdi:chevron-right></div> -->
                <nut-textarea v-model="orderInfo.remark" readonly limit-show max-length="200" />
            </div>
        </div>
    </div>
    <ReviewPopup
        v-if="activeOrderId && activeProductId"
        v-model:visible="reviewShow"
        :activeOrderId="activeOrderId"
        :activeProductId="activeProductId"
    ></ReviewPopup>
</template>

<style scoped lang="scss">
.line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15rpx 0;
    .label {
        font-size: 26rpx;
        font-weight: 500;
    }
    .value {
        color: #aeaeae;
        font-size: 26rpx;
    }
}
:deep(.nut-textarea) {
    padding: 18rpx;
    background-color: #f6f6f7 !important;
    border-radius: 10rpx;
}
.order-btn {
    color: #ffaa48;
    font-size: 24rpx;
    border: 1rpx solid #ffaa48;
    box-sizing: border-box;
    padding: 5rpx 18rpx;
    border-radius: 999999rpx;
    margin-right: 20rpx;
    &:last-child {
        margin-right: 0;
    }
}
</style>
