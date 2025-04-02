copyFlowList
<script setup lang="ts">
import { ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { productRecommendApi } from "@/api";
import { gotoPage } from "@/utils/uni";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";

const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();

onMounted(() => {
    nextTick(() => getList(false));
});

const paging = {
    page: 1,
    limit: 10,
};
const getList = async (isPush: boolean = false) => {
    let { data } = await productRecommendApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
    });
    if (isPush) {
        if (WaterfallsFlowRef.value) {
            let complete = await WaterfallsFlowRef.value.pushData(
                data.map((item) => ({ ...item, img: item.imageUrl, idKey: "key" + item.id }))
            );
            complete && paging.page++;
        }
    } else {
        if (WaterfallsFlowRef.value) {
            paging.page = 1;
            WaterfallsFlowRef.value.clearList();
            await WaterfallsFlowRef.value.pushData(
                data.map((item) => ({ ...item, img: item.imageUrl, idKey: "key" + item.id }))
            );
        }
    }
};
</script>

<template>
    <div>
        <div class="h-80 flex items-center">
            <image src="@/static/img/hot-icon.png" class="size-32 mr-10" />
            <span class="text-32 font-500">热门推荐</span>
        </div>
        <!-- 瀑布流列表 -->
        <WaterfallsFlow
            ref="WaterfallsFlowRef"
            @itemClick="
                (i) => {
                    gotoPage(`/pages/product/details?id=${i.id}`);
                }
            "
        >
            <template #text="{ item }">
                <div class="bg-#fff b-rd-b-16 box-border p-16">
                    <div class="text-24">{{ item.merchName }}</div>
                    <div>
                        <span class="font-500 text-18">￥</span>
                        <span class="text-24 font-700">{{ item.price }}</span>
                    </div>
                    <div class="flex items-center">
                        <div class="flex items-center border-1 border-#000 border-solid">
                            <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                            <span class="text-12 mx-10">省{{ item.price - item.currentPrice }}</span>
                        </div>
                    </div>
                </div>
            </template>
        </WaterfallsFlow>
    </div>
</template>

<style scoped lang="scss">
.aaa {
    border-radius: 0 0 16rpx 16rpx;
    height: fit-content;
}
</style>
