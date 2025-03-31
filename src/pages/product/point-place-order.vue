<!-- 积分商品确认订单 -->
<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { pointsProductDetailApi } from "@/api";
import type { Points } from "@/api";
import { useSelectAddress } from "@/hooks/useSelectAddress";

const { activeAddress, selectAddress } = useSelectAddress();

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);
const count = ref(1);

const detail = ref<Points.Product>(); // 商品信息

onLoad(async (query) => {
    if (!query) return;
    let { body } = await pointsProductDetailApi({ id: query.id as number });
    detail.value = body.merchCoin;
});

const totalScore = computed(() => {
    if (!detail.value) return 0;
    return count.value * detail.value?.coin;
});
</script>

<template>
    <div class="main bg-#F8F8F8 box-border px32" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff">确认订单</NavBar>
        <!-- 地址 -->
        <div class="wfull b-rd-12 bg-#fff flex box-border py20 mt15">
            <div class="flex-1 min-w-0 flex" @click="selectAddress">
                <div class="w-100 flex-shrink-0 flex-center">
                    <div class="size-40 bg-#FF9113 b-rd-full flex-center">
                        <span class="i-mdi:map-marker-radius text-#fff size-80%"></span>
                    </div>
                </div>
                <div class="flex-1 min-w-0 fw500 text-30">
                    <template v-if="activeAddress">
                        <div>{{ activeAddress?.address }}</div>
                        <div my10>{{ activeAddress?.doorplate }}</div>
                        <div class="fw400 text-#949494 text-22">
                            <span mr15>{{ activeAddress?.contactName }}</span>
                            <span>{{ activeAddress?.contactPhone }}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div>请选择地址</div>
                    </template>
                </div>
            </div>
            <div class="w-100 flex-shrink-0 flex-center">
                <span i-mdi:chevron-right></span>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="wfull bg-#fff my20 box-border b-rd-12">
            <div class="fw500 text-26 h80 flex items-center box-border pl20">积分兑换</div>

            <div class="wfull flex h-fit b-#EBEBEB b-1rpx b-b-solid box-border py20">
                <div class="size-152 mx20">
                    <image :src="detail?.imageUrl" mode="aspectFill" class="size-full" />
                </div>
                <div class="h152 flex-col justify-between">
                    <div fw500 text-28>{{ detail?.merchName }}</div>
                    <div class="text-#FF9113 fw500 text-30 mta">{{ detail?.coin }}积分</div>
                </div>
            </div>
            <div class="h100 flex items-center justify-between wfull b-#EBEBEB b-1rpx b-b-solid box-border px-20">
                <div class="fw500 text-26">数量</div>
                <div>
                    <nut-input-number v-model="count"></nut-input-number>
                </div>
            </div>
            <div class="h100 flex items-center justify-between wfull box-border px-20">
                <div class="fw500 text-26">需要积分</div>
                <div class="fw500 text-30 text-#FF9113">{{ totalScore }}积分</div>
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="wfull bg-#fff box-border b-rd-12 box-border p20">
            <div class="fw500 text-30 h70 flex items-center">支付方式</div>
            <div class="wfull flex items-center justify-between">
                <div flex items-center>
                    <div class="size-40 mr20">
                        <image src="@/static/img/gold-icon.png" class="size-full" />
                    </div>
                    <div fw500 text-26>积分兑换</div>
                </div>
                <div class="b-rd-full flex-center bg-#FFAA48 size-35">
                    <span i-mdi:check text-white class="size-80%"></span>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div :style="bottomStyle" class="bg-#fff flex items-center justify-end box-border px32">
            <div class="flex-center">
                <div fw500 mr20>
                    <span class="text-26 mr10">合计:</span>
                    <span class="text-30 text-#FF9113">{{ totalScore }}积分</span>
                </div>
                <div
                    class="bg-[linear-gradient(97deg,#FECE62_0%,#FF9113_100%)] text-#fff flex-center b-rd-full fw500 text-30 box-border px25 py10"
                >
                    兑换
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
