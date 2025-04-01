<script setup lang="ts">
import { onMounted, ref } from "vue";
import { OrderListApi } from "@/api";
import type { Order } from "@/api";

const activeTab = ref(0);
// 10未支付 20已支付 30已完成 40已发货 50已完成 60已评论 90拼团中 70退款
const tabList = ref([
    { name: "全部", value: "" },
    { name: "未支付", value: "10" },
    { name: "已支付", value: "20" },
    { name: "已完成", value: "30" },
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

onMounted(async () => getOrderList(false));

const orderList = ref<(Order.OrderInfo & { statusText: string })[]>([]);
async function getOrderList(isPush: boolean = false) {
    let { data } = await OrderListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
        status: tabList.value[activeTab.value].value,
    });
    let ndata = data.map((item) => {
        let tab = tabList.value.find((tab) => tab.value === item.status);
        return {
            statusText: tab?.name || "未知",
            ...item,
        };
    });
    if (isPush) {
        if (data.length === 0) return;
        paging.page++;
        orderList.value.push(...ndata);
    } else {
        paging.page = 1;
        orderList.value = ndata;
    }
}
</script>

<template>
    <div class="main bg-#F2F2F2">
        <NavBar>我的订单</NavBar>
        <Tabs
            :tabList="tabList"
            keyName="name"
            v-model:activeTab="activeTab"
            style="--tabs-line-bagcolor: #ffaa48"
            @change="getOrderList(false)"
        ></Tabs>
        <div class="wfull box-border px34">
            <div class="bg-#fff b-rd-14 mt25" v-for="(item, index) in orderList" :key="item.id">
                <div class="wfull flex items-center justify-between b-#EFEFEF b-1rpx b-b-solid">
                    <div class="flex items-center">
                        <image :src="item.shopLogo" mode="aspectFill" class="size-50 b-rd-full" />
                        <div>{{ item.shopName }}</div>
                        <span i-mdi:chevron-right></span>
                    </div>
                    <div>{{ item.statusText }}</div>
                </div>
                <div class="wfull flex">
                    <div>
                        <image src="" mode="aspectFill" />
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
