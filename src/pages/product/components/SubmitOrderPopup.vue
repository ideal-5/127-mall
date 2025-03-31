<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "@/api";
import { useSelectAddress } from "@/hooks/useSelectAddress";

interface Props {
    productInfo: (Product.Product & { activePrice: number }) | null;
    specificationList: (Product.Specification & { activePrice: number })[] | null;
}

const props = withDefaults(defineProps<Props>(), {
    productInfo: null,
    specificationList: null,
});

const showSubmitPopup = defineModel<boolean>("visible", { required: true });
const submitCount = defineModel<number>("count", { required: true });

const activeSpecification = ref(0); // 选中的规格

const activeSpecificationInfo = computed(() => {
    if (props.specificationList) {
        return props.specificationList[activeSpecification.value];
    }
    return null;
});

const isListShow = ref(true); // 列表&大图

/**
 * 地址
 */

const { activeAddress, selectAddress } = useSelectAddress();

/**
 * 备注
 */
const remarkInp = ref("");

/**
 * 支付方式
 */
const activePayType = ref("20");
const payType = ref([
    { label: "微信支付", value: "20", icon: "i-ri:wechat-pay-fill", color: "#3BCA72" },
    { label: "支付宝支付", value: "10", icon: "i-ri:alipay-fill", color: "#1296DB" },
    { label: "银行卡支付", value: "30", icon: "i-ri:bank-card-fill", color: "#FFB346" },
]);

/**
 * 下单
 */
</script>

<template>
    <div>
        <nut-popup
            position="bottom"
            :custom-style="{ height: '80vh', display: 'flex', 'flex-direction': 'column' }"
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
                <div
                    class="wfull box-border py32 flex box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2"
                    v-if="activeSpecificationInfo"
                >
                    <div size-190 flex-shrink-0 mr32>
                        <image
                            :src="activeSpecificationInfo.skuImage"
                            mode="aspectFill"
                            class="size-190 b-rd-12 bg-fuchsia"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center">
                            <div class="text-#EC3013 fw500 mr32">
                                <span text-28>￥</span>
                                <span text-42>{{ activeSpecificationInfo.activePrice }}</span>
                            </div>
                            <!-- <div class="text-#949494 text-24 line-through">￥19.99</div> -->
                        </div>
                        <div text-26 my28>已选: {{ activeSpecificationInfo.skuName }}</div>
                        <nut-input-number v-model="submitCount"></nut-input-number>
                    </div>
                </div>
                <!-- 分类 -->
                <div class="wfull box-border py32 box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2">
                    <div class="flex items-center justify-between wfull">
                        <div text-30 fw500>规格分类({{ props.specificationList?.length }})</div>
                        <div @click="isListShow = !isListShow">
                            <span :class="isListShow ? 'i-mdi:format-list-bulleted' : 'i-mdi:view-grid-outline'"></span>
                            <span text-24>{{ isListShow ? "列表" : "大图" }}</span>
                        </div>
                    </div>
                    <div class="wfull transition-all-300" :class="!isListShow && 'grid grid-cols-3 gap-10'">
                        <div
                            class="wfull b-rd-10 flex-center justify-between box-border mt20 b-solid b-2rpx transition-all-300"
                            :class="[
                                index === activeSpecification ? `b-#FF9113 bg-#FFEDC4` : `b-transparent bg-#F5F5F5`,
                                isListShow ? 'p15' : 'flex-col',
                            ]"
                            v-if="props.specificationList"
                            v-for="(item, index) in props.specificationList"
                            :key="item.id"
                            @click="activeSpecification = index"
                        >
                            <div
                                class="flex-1 transition-all-300"
                                :class="isListShow ? 'min-w-0 flex items-center' : 'min-h-0 wfull'"
                            >
                                <div
                                    transition-all-300
                                    :class="isListShow ? 'size-56 flex-shrink-0 mr15 ' : 'wfull h206'"
                                >
                                    <image
                                        class="size-full b-rd-8 bg-fuchsia transition-all-300"
                                        :src="item.skuImage"
                                        mode="aspectFill"
                                    />
                                </div>
                                <div
                                    class="flex-1 min-w-0 truncate text-26 transition-all-300"
                                    :class="isListShow ? '' : 'my8 box-border px15'"
                                >
                                    {{ item.skuName }}
                                </div>
                            </div>
                            <div
                                class="flex-shrink-0 fw500 text-26 text-#949494 transition-all-300"
                                :class="isListShow ? 'w100 flex-center' : 'h40 wfull box-border px15 '"
                            >
                                ￥{{ item.activePrice }}
                            </div>
                        </div>
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
                >
                    <span text-28>立即支付</span>
                    <span text-34 v-if="activeSpecificationInfo"
                        >￥{{ activeSpecificationInfo?.activePrice * submitCount }}</span
                    >
                </div>
            </div>
        </nut-popup>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-textarea) {
    padding: 18rpx;
    background-color: #f6f6f7 !important;
    border-radius: 10rpx;
}
</style>
