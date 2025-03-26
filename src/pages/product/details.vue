<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStyle } from "@/hooks/useStyle";
import type { Product } from "@/types";
import WaterfallsFlow from "@/components/WaterfallsFlow.vue";
import { gotoPage } from "@/utils/uni";

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120);

const swiperList = ref(Array.from({ length: 5 }, (_, i) => `https://picsum.photos/700/350?random=${Math.random()}`));

onMounted(() => {
    WaterfallsFlowRef.value && WaterfallsFlowRef.value.pushData(list.value);
});

const list = ref<Product[]>([
    {
        img: "https://picsum.photos/300/450",
        name: "家用3C 数码电器电饭煲",
        price: "311.99",
        vprice: "18.00",
    },
    { img: "https://picsum.photos789/300/520", name: "智能手表 运动监测", price: "199.99", vprice: "25.00" },
    {
        img: "https://picsum.photos/300/430",
        name: "无线蓝牙耳机 降噪版",
        price: "129.99",
        vprice: "15.00",
    },
    {
        img: "https://picsum.photos/300/480",
        name: "家用空气炸锅 健康低脂",
        price: "279.99",
        vprice: "22.00",
    },
    { img: "https://picsum.photos/300/510", name: "便携式投影仪 高清", price: "459.99", vprice: "30.00" },
    {
        img: "https://picsum.photos/300/400",
        name: "高性能游戏鼠标 RGB灯光",
        price: "89.99",
        vprice: "10.00",
    },
    {
        img: "https://picsum.photos/300/550",
        name: "时尚智能音箱 语音助手",
        price: "159.99",
        vprice: "18.50",
    },
    {
        img: "https://picsum.photos/300/470",
        name: "家用电动剃须刀 便捷",
        price: "109.99",
        vprice: "12.00",
    },
    {
        img: "https://picsum.photos/300/530",
        name: "办公无线键盘 机械手感",
        price: "139.99",
        vprice: "17.00",
    },
    {
        img: "https://picsum.photos/300/490",
        name: "高清摄像头 直播专用",
        price: "249.99",
        vprice: "28.00",
    },
]);
const WaterfallsFlowRef = ref<InstanceType<typeof WaterfallsFlow>>();

const showBottomPopup = ref(false);
const showBottomPopupData = ref({
    title: "",
    content: "",
});
const showBottomPopupFunc = (type: "service" | "deliver-goods") => {
    if (type === "service") {
        showBottomPopupData.value = {
            title: "服务说明",
            content: `
    <p>感谢您选择我们的服务！我们提供一系列专业的解决方案，旨在为您的需求提供高效且个性化的支持。以下是我们服务的主要内容：</p>
    <ul>
      <li><strong>产品售后支持：</strong>在产品购买后，我们为您提供 30 天内的无理由退换货服务，确保您能够放心使用我们的产品。</li>
      <li><strong>定期更新和维护：</strong>我们会定期对产品进行系统升级，确保您始终使用最新版本的软件，以获得最佳的使用体验。</li>
      <li><strong>个性化定制服务：</strong>根据您的需求，我们可以提供产品的定制化服务，包括功能定制、UI 设计等。</li>
      <li><strong>全天候技术支持：</strong>我们的客服团队会在工作日 9:00 - 18:00 提供及时的技术支持，并在紧急情况下提供加急支持。</li>
    </ul>
    <p>如有任何问题，欢迎随时联系我们的客服团队，我们将竭诚为您服务。</p>
    <p><strong>联系方式：</strong><br>电话：400-123-4567<br>邮箱：support@example.com</p>
  `,
        };
    } else if (type === "deliver-goods") {
        showBottomPopupData.value = {
            title: "发货说明",
            content: `
    <p>我们致力于为每一位客户提供快速、准时的发货服务。以下是我们的发货政策：</p>
    <ol>
      <li><strong>标准快递：</strong>在确认订单并收到付款后的 1-2 个工作日内，我们将通过标准快递为您发货。预计配送时间为 3-5 个工作日。</li>
      <li><strong>加急配送：</strong>如果您需要更快的配送服务，我们提供加急配送选项。选择加急配送后，我们会在收到付款后的 1 个工作日内发货，预计 1-2 个工作日内送达。</li>
      <li><strong>海外发货：</strong>对于国际订单，我们提供海外发货服务。国际配送时间依据目的地国家的不同会有所不同，通常在 7-14 个工作日内送达。</li>
      <li><strong>订单追踪：</strong>发货后，我们将通过短信或电子邮件将快递单号发送给您。您可以使用该单号在快递公司的官网进行订单追踪。</li>
    </ol>
    <p>请注意，在特殊节假日或恶劣天气情况下，配送可能会有所延迟。我们会尽最大努力保证准时发货并及时通知您订单的状态。</p>
    <p><strong>特别提醒：</strong>请确保您在订单中填写的收货地址准确无误。如果因地址错误导致无法送达，我们将无法承担相应的责任。</p>
  `,
        };
    }
    showBottomPopup.value = true;
};

/**
 * 下单
 */
const showSubmitPopup = ref(true);
const submitCount = ref(1);
</script>

<template>
    <div class="main box-border bg-#F8F8F8" :style="{ paddingBottom: bottomHeightNum + 30 + 'rpx' }">
        <NavBar isEmptyFill></NavBar>
        <!-- 轮播图 -->
        <div class="wfull h730" @click="gotoPage('swiper')">
            <nut-swiper
                :init-page="1"
                :pagination-visible="true"
                pagination-color="#426543"
                pagination-unselected-color="#808080"
                auto-play="8000"
                class="w-full hfull"
            >
                <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
                    <image :src="item" mode="aspectFill" class="wfull hfull" />
                </nut-swiper-item>
            </nut-swiper>
        </div>
        <!-- 商品信息 -->
        <div class="wfull b-rd-t-30 bg-#F8F8F8 -mt-62 box-border px34 relative">
            <div class="wfull h80 flex justify-between items-center">
                <div class="flex items-center">
                    <div class="font-500 text-#EC3013 mr32">
                        <span class="text-28">￥</span>
                        <span class="text-42">12.99</span>
                    </div>
                    <span class="text-#949494 text-24 line-through">￥19.99</span>
                </div>
                <div class="text-#EC3013 text-24">已售1万件+</div>
            </div>
            <div class="text-30 font-500 wfull mt20 mb40">
                植护悬挂洗脸巾一次性干湿两用壁挂式界面擦脸巾 加厚棉柔巾100抽
            </div>
            <div class="wfull flex items-center flex-wrap">
                <div
                    class="text-20 text-#A2833B b-solid b-1 b-#A2833B b-rd-6 bg-#FFFAEF box-border px13 py6 mr15 mb15"
                    v-for="(item, index) in 3"
                    :key="index"
                >
                    同款好评12.8万
                </div>
            </div>
            <div class="wfull bg-#fff b-rd-14 mt20">
                <div class="wfull flex box-border py15" @click="showBottomPopupFunc('service')">
                    <div class="w80 flex justify-center flex-shrink-0">
                        <span class="i-mdi:shield-check-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22 mb10">运费险·7天无理由退货·极速退款</div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <!-- <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div> -->
                    </div>
                </div>
                <div class="wfull flex box-border py15" @click="showBottomPopupFunc('deliver-goods')">
                    <div class="w80 flex justify-center flex-shrink-0">
                        <span class="i-mdi:truck-outline"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="wfull flex items-center justify-between">
                            <div class="text-22 mb10">最晚48小时内发货，晚发即赔</div>
                            <div class="i-mdi:chevron-right"></div>
                        </div>
                        <div class="text-16 text-#AEAEAE">福建省福州市 发货 | 免运费</div>
                    </div>
                </div>
            </div>
            <!-- 商品详情 -->
            <div class="wfull">
                <div class="wfull h80 flex-center">
                    <span class="title-class fw500 text-28">商品详情</span>
                </div>
                <image src="https://picsum.photos/300/600" mode="widthFix" class="wfull" />
            </div>
            <!-- 评论 -->
            <div bg-white wfull mt20 mb20 @click.stop="gotoPage('comment')">
                <div flex items-center justify-between h80 box-border px-10>
                    <div text-28 fw500>商品评价(2.2万)</div>
                    <div i-mdi:chevron-right></div>
                </div>
                <div wfull flex items-center mb-20 box-border px-10>
                    <div
                        class="bg-#FEF3DA b-rd-6 text-20 box-border px10 py5 mr15"
                        v-for="(item, index) in 3"
                        :key="index"
                    >
                        <span>回头客 </span>
                        <span class="text-#949494">1.2万</span>
                    </div>
                </div>

                <div wfull>
                    <div
                        class="b-b-#E8E8E8 box-border py-15 wfull b-b-solid b-b-1rpx last:b-b-0 box-border px-10"
                        v-for="(item, index) in 3"
                        :key="index"
                    >
                        <div flex items-center>
                            <image
                                src="https://picsum.photos/seed/picsum/200/300"
                                mode="aspectFill"
                                class="size-42 b-rd-full mr10"
                            />
                            <div class="text-#949494" text-20>我是用户名</div>
                        </div>
                        <div wfull flex justify-between>
                            <div class="text-#949494 text-24 flex-1 min-w-0 truncate-2 h-fit mt18">
                                特别好用亲肤 快递也很快， 物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤
                                快递也很快， 物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤 快递也很快，
                                物有所值比我之前 买的都是好用会一直回购的，会 特别好用亲肤 快递也很快， 物有所值比我之前
                                买的都是好用会一直回购的，会 特别好用亲肤 快递也很快， 物有所值比我之前
                                买的都是好用会一直回购的，会
                            </div>
                            <div w200 flex justify-end flex-shrink-0>
                                <image
                                    src="https://picsum.photos/seed/picsum/200/300"
                                    mode="aspectFill"
                                    size-90
                                    b-rd-16
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 推荐 -->
            <div wfull>
                <div fw500 text-28 mb20>相关推荐</div>
                <WaterfallsFlow ref="WaterfallsFlowRef">
                    <template #text="{ item }">
                        <div class="bg-#fff b-rd-b-16 box-border p-16">
                            <div class="text-24">{{ item.name }}</div>
                            <div>
                                <span class="font-500 text-18">￥</span>
                                <span class="text-24 font-700">{{ item.price }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center border-1 border-#000 border-solid">
                                    <image src="@/static/img/vip1.png" mode="scaleToFill" class="size-25" />
                                    <span class="text-12 mx-10">省{{ item.vprice }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </WaterfallsFlow>
            </div>
        </div>
        <!-- 底部 -->
        <div class="flex items-center box-border px32" :style="bottomStyle">
            <div flex-1 min-w-0 h100 flex items-center justify-around>
                <div flex-col items-center>
                    <image src="https://picsum.photos/seed/picsum/200/300" mode="aspectFill" size-48 b-rd-full />
                    <span text-22>进店</span>
                </div>
                <div flex-col items-center>
                    <span i-ri:customer-service-line size-48 />
                    <span text-22>客服</span>
                </div>
                <div flex-col items-center>
                    <span i-mdi:cart-minus size-48 />
                    <span text-22>购物车</span>
                </div>
            </div>
            <div class="flex h76 flex-shrink-0">
                <div class="hfull text-24 text-#FF8B06 bg-#FFEDC4 b-rd-l-full flex-center box-content px22">
                    加入购物车
                </div>
                <div
                    class="hfull flex-col items-center justify-center text-#fff bg-#FFAA48 b-rd-r-full box-border px50"
                >
                    <span class="fw500 text-30">￥12.90</span>
                    <span class="text-20">立即购买</span>
                </div>
            </div>
        </div>
    </div>
    <nut-popup
        position="bottom"
        :custom-style="{ height: '60vh' }"
        v-model:visible="showBottomPopup"
        round
        closeable
        lock-scroll
    >
        <div class="flex-col wfull hfull">
            <div wfull h100 flex-center text-34 flex-shrink-0>{{ showBottomPopupData.title }}</div>
            <div class="flex-1 min-h-0 wfull overflow-scroll box-border px32">
                <rich-text :nodes="showBottomPopupData.content"></rich-text>
            </div>
        </div>
    </nut-popup>
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
</template>

<style scoped lang="scss">
.title-class {
    position: relative;
    &::after,
    &::before {
        content: " ";
        width: 80rpx;
        height: 2rpx;
        border-radius: 4rpx;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    &::after {
        background: linear-gradient(270deg, #f8f8f8 0%, #000000 100%);
        left: calc(100% + 16rpx);
    }
    &::before {
        background: linear-gradient(90deg, #f8f8f8 0%, #000000 100%);
        right: calc(100% + 16rpx);
    }
}
</style>
