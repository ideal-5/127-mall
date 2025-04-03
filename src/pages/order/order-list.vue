<script setup lang="ts">
import { onMounted, ref } from "vue";
import { OrderListApi, OrderConfirmApi, productIdApi } from "@/api";
import type { Order } from "@/api";
import { useStyle } from "@/hooks/useStyle";
// import ReviewPopup from "./components/ReviewPopup.vue";
import { gotoPage } from "@/utils/uni";
import { onReachBottom } from "@dcloudio/uni-app";

const stickyStyle = useStyle().sticky("navBar");

const activeTab = ref(0);
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

const paging = {
    page: 1,
    limit: 10,
};

const orderList = ref<Order.OrderInfo[]>([]);
async function getOrderList(isPush: boolean = false) {
    let { data } = await OrderListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        status: tabList.value[activeTab.value].value,
    });
    let zndata = await Promise.all(
        data.map(async (order) => {
            let tab = tabList.value.find((tab) => tab.value === order.status);
            order.statusText = tab?.name || "未知";
            let nOrderDetails = await Promise.all(
                order.orderDetails.map(async (detail) => {
                    const { body } = await productIdApi({ skuId: detail.skuId });
                    detail.productId = body as number;
                    return detail;
                })
            );
            return { ...order, orderDetails: nOrderDetails };
        })
    );
    console.log("zndata", zndata);
    if (isPush) {
        if (data.length === 0) return;
        paging.page++;
        orderList.value.push(...zndata);
    } else {
        paging.page = 1;
        orderList.value = zndata;
    }
}
onMounted(async () => getOrderList(false));
onReachBottom(() => getOrderList(true));
watch(
    () => activeTab.value,
    () => getOrderList(false)
);

// 收货
async function receiveGoods(id: number) {
    await OrderConfirmApi({ id });
    let index = tabList.value.findIndex((it) => it.value === "50");
    if (index !== -1) {
        activeTab.value = index;
    }
}
// // 评论
// const reviewShow = ref(false);
// const activeOrderId = ref<number | null>(null); // 子订单id
// const activeProductId = ref<number>(); // 商品id
// // const active;
// async function reviewClick(order: Order.OrderInfo) {
//     if (order.orderDetails.length === 1) {
//         // 调弹窗
//         activeOrderId.value = order.orderDetails[0].id;
//         activeProductId.value = order.orderDetails[0].productId;
//         reviewShow.value = true;
//     } else {
//         // 进详情
//     }
// }

// 点击店铺
function shopClick(order: Order.OrderInfo) {
    console.log("order", order);
}
</script>

<template>
    <div class="main bg-#F2F2F2">
        <NavBar barColor="#fff">我的订单</NavBar>
        <Tabs
            :tabList="tabList"
            keyName="name"
            v-model:activeTab="activeTab"
            style="background-color: #fff; --tabs-line-bagcolor: #ffaa48"
            :style="stickyStyle"
        ></Tabs>
        <div class="wfull box-border px34">
            <div
                class="bg-#fff b-rd-14 mt25"
                v-for="(order, index) in orderList"
                :key="order.id"
                @click.stop="gotoPage(`order-details?id=${order.id}`)"
            >
                <!-- 头部状态区域 -->
                <div class="wfull flex items-center justify-between b-#EFEFEF b-1rpx b-b-solid box-border p18">
                    <div class="flex items-center" @click="shopClick(order)">
                        <image :src="order.shopLogo" mode="aspectFill" class="size-50 b-rd-full mr14" />
                        <div class="text-26 fw500">{{ order.shopName }}</div>
                        <div class="text-26 fw500">{{ order.orderType }}</div>
                        <span i-mdi:chevron-right></span>
                    </div>
                    <div class="text-#FF9113 text-26">{{ order.statusText }}</div>
                </div>
                <!-- 中间商品区域 -->
                <div class="wfull box-border p18 b-#EFEFEF b-1rpx b-b-solid">
                    <div class="wfull flex mb20" v-for="(product, ind) in order.orderDetails" :key="product.id">
                        <div
                            class="size-186 flex-shrink-0 mr24"
                            @click="gotoPage(`/pages/product/details?id=${product.skuId}`)"
                        >
                            <image :src="product.skuImage" mode="aspectFill" class="size-186 b-rd-10" />
                        </div>
                        <div class="flex-1 min-w-0 h186 flex-col justify-around box-border py25">
                            <div class="flex items-center justify-between fw500 text-26 wfull">
                                <div class="flex-1 min-w-0 overflow-scroll truncate-1">{{ product.merchName }}</div>
                                <div class="wfit flex-shrink-0 ml30">￥{{ product.currentAmount }}</div>
                            </div>
                            <div class="flex items-center justify-between text-22 text-#AEAEAE wfull">
                                <div class="flex-1 min-w-0 overflow-scroll truncate-1">{{ product.skuName }}</div>
                                <div class="wfit flex-shrink-0 ml30">X{{ product.stock }}</div>
                            </div>
                            <div class="wfull flex overflow-scroll">
                                <div
                                    class="bg-#FEEAE7 b-#EC3013 b-1rpx b-solid b-rd-6 text-14 text-#EC3013 mr10 box-border px10 py4 flex-center"
                                    v-for="(tag, tabInd) in product?.properties"
                                    :key="tag.id"
                                >
                                    {{ tag.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wfull flex items-center justify-end">
                        <div>
                            <span class="text-20">需付款￥</span>
                            <span class="fw500 text-32">{{ order.currentAmount }}</span>
                        </div>
                    </div>
                </div>
                <!-- 底部按钮区域 -->
                <div class="flex items-center wfull box-border p18 justify-end">
                    <!-- <div class="order-btn">再来一单</div> -->
                    <div class="order-btn" v-if="order.status === '10'">立即支付</div>
                    <div class="order-btn" v-if="order.status === '40'" @click.stop="receiveGoods(order.id)">
                        已收货
                    </div>
                    <!-- <div class="order-btn" v-if="order.status === '50'" @click.stop="reviewClick(order)">评论</div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- <ReviewPopup
        v-if="activeOrderId && activeProductId"
        v-model:visible="reviewShow"
        :activeOrderId="activeOrderId"
        :activeProductId="activeProductId"
    ></ReviewPopup> -->
</template>

<style scoped lang="scss">
.order-btn {
    color: #ffaa48;
    font-size: 26rpx;
    border: 1rpx solid #ffaa48;
    box-sizing: border-box;
    padding: 10rpx 18rpx;
    border-radius: 999999rpx;
    margin-right: 20rpx;
    &:last-child {
        margin-right: 0;
    }
}
</style>
