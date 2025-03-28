<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "@/api";

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
                <div class="h100 wfull flex justify-end items-center box-border px32 sticky top-0">
                    <span i-mdi:close></span>
                </div>
                <!-- 地址 -->
                <div class="wfull flex items-center h-fit b-b-solid b-b-4rpx b-b-#F2F2F2 box-border py20">
                    <div class="flex-1 min-w-0 flex hfull flex items-center">
                        <div class="w100 hfull flex-center flex-shrink-0">
                            <span i-mdi:map-marker-radius></span>
                        </div>
                        <div class="fw500 text-30 flex-1 min-w-0">
                            <div mb8>我是地址大概</div>
                            <div>我是地址详情</div>
                            <div class="text-#949494 text-22 mt15">
                                <span mr20>名字</span>
                                <span>1212313456</span>
                            </div>
                        </div>
                    </div>
                    <div class="w100 hfull flex-center flex-shrink-0">
                        <span i-mdi:chevron-right></span>
                    </div>
                </div>
                <!-- 商品 -->
                <div class="wfull box-border py32 flex box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2">
                    <div size-190 flex-shrink-0 mr32>
                        <image src="" mode="aspectFill" class="size-190 b-rd-12 bg-fuchsia" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center">
                            <div class="text-#EC3013 fw500 mr32">
                                <span text-28>￥</span>
                                <span text-42>12.99</span>
                            </div>
                            <div class="text-#949494 text-24 line-through">￥19.99</div>
                        </div>
                        <div text-26 my28>已选: 的撒进口的哈卡刷点卡是的</div>
                        <nut-input-number v-model="submitCount"></nut-input-number>
                    </div>
                </div>
                <!-- 分类 先不写 -->
                <div class="wfull box-border py32 box-border px32 b-b-solid b-b-4rpx b-b-#F2F2F2">
                    <div class="flex items-center justify-between wfull">
                        <div text-30 fw500>规格分类({{ props.specificationList?.length }})</div>
                        <div>
                            <span i-mdi:format-list-bulleted></span>
                            <span text-24>列表</span>
                        </div>
                    </div>
                    <div class="wfull">
                        <div
                            class="wfull b-rd-10 flex-center justify-between box-border p15 mt20 b-solid b-2rpx transition"
                            :class="index === activeSpecification ? `b-#FF9113 bg-#FFEDC4` : `b-transparent bg-#F5F5F5`"
                            v-for="(item, index) in 10"
                            :key="item"
                            @click="activeSpecification = index"
                        >
                            <div class="flex-1 min-w-0" flex items-center>
                                <div size-56 flex-shrink-0 mr15>
                                    <image class="size-full b-rd-8 bg-fuchsia" src="" mode="aspectFill" />
                                </div>
                                <div flex-1 min-w-0 truncate text-26>
                                    附件客户是的开发计划房价的快速了解法律手段家乐福肯定是
                                </div>
                            </div>
                            <div class="w100 flex-shrink-0 flex-center fw500 text-26 text-#949494">￥12.55</div>
                        </div>
                    </div>
                </div>
                <!-- 订单备注 -->
                <div
                    class="wfull flex items-center justify-between box-border p32 b-b-solid b-b-6rpx b-b-#F2F2F2"
                    v-for="item in 30"
                    :key="item"
                >
                    <div text-26 fw500>订单备注</div>
                    <div i-mdi:chevron-right></div>
                </div>
            </div>
            <div class="wfull h120 flex-center box-border px32">
                <div
                    class="bg-[linear-gradient(109deg,#FFAA48_0%,#FF9113_100%)] wfull h92 fw500 flex-center text-#fff b-rd-16"
                >
                    <span text-28>立即支付</span>
                    <span text-34>￥12.90</span>
                </div>
            </div>
        </nut-popup>
    </div>
</template>

<style scoped lang="scss"></style>
