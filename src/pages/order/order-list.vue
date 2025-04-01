<script setup lang="ts">
import { OrderListApi } from "@/api";

const activeTab = ref(0);
// 10未支付 20已支付 30已完成 40已发货 50已完成 60已评论 90拼团中 70退款
const tabList = ref([
    { name: "全部", value: "" },
    { name: "待付款", value: "10" },
    { name: "待发货", value: "20" },
    { name: "已完成", value: "30" },
]);

const Paging = {
    page: 1,
    limit: 10,
};

onMounted(async () => {
    await OrderListApi({ ...Paging, status: tabList.value[activeTab.value].value });
});
</script>

<template>
    <div class="main">
        <NavBar>我的订单</NavBar>
        <Tabs
            :tabList="tabList"
            keyName="name"
            v-model:activeTab="activeTab"
            style="--tabs-line-bagcolor: #ffaa48"
        ></Tabs>
    </div>
</template>

<style scoped lang="scss"></style>
