<!-- 
 
厂家直销

-->

<script setup lang="ts">
import { gotoPage } from "@/utils/uni";
import { directSellingProductListApi } from "@/api";
import type { DirectSelling } from "@/api";

const list = ref<DirectSelling.Product[]>([]);
onMounted(async () => {
    let { data } = await directSellingProductListApi({ page: 1, limit: 4 });
    list.value = data;
});
</script>

<template>
    <div
        class="bg-[linear-gradient(179deg,#FFDBB8_0%,#FFFFFF_40%,#FFFFFF_100%)] w-324 h-464 box-border px-16 b-rd-10"
        @click.stop="gotoPage('direct-selling')"
    >
        <div class="text-30 font-900 h-70 flex items-center">厂家直销</div>
        <div class="flex flex-wrap justify-between">
            <div v-for="(item, index) in list" :key="item.id" class="flex flex-col items-center mb-20">
                <div class="size-134 position-relative">
                    <image class="size-full b-rd-10" :src="item.skuImage" mode="aspectFill" />
                    <div
                        class="bg-[#FEEAE7] b-rd-6 w-84 h-28 flex items-center justify-center position-absolute top-[100%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <span class="text-14 text-[#EC3013]">已出售{{ item.saleCount }}</span>
                    </div>
                </div>
                <span class="text-22 text-[#EC3013] mt-20 font-500">￥{{ item.price }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.aaa {
    transform: translateX(-50%);
}
</style>
