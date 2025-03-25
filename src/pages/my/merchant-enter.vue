<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref } from "vue";
export interface Request {
    /**
     * 详细地址
     */
    address?: string;
    /**
     * 身份证背面照片
     */
    backImage?: string;
    /**
     * 联系人
     */
    contactName?: string;
    /**
     * 联系人电话
     */
    contactPhone?: string;
    /**
     * 身份证正面照片
     */
    faceImage?: string;
    /**
     * 身份证号
     */
    identityCode?: string;
    /**
     * 店铺轮播图
     */
    imageList?: string[];
    /**
     * 短信验证码
     */
    msgCode?: number;
    /**
     * 店铺logo
     */
    shopLogo?: string;
    /**
     * 店铺名称
     */
    shopName?: string;
    /**
     * 分类id
     */
    sortId?: number;
    [property: string]: any;
}

const from = ref<Request>({
    address: "",
    backImage: "",
    contactName: "",
    contactPhone: "",
    faceImage: "",
    identityCode: "",
    imageList: [],
    msgCode: 0,
    shopLogo: "",
    shopName: "",
    sortId: 0,
});

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);
</script>

<template>
    <div class="main box-border px32 bg-#EFEFEF" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff">商家入驻</NavBar>
        <nut-form
            label-position="top"
            star-position="right"
            style="
                --nut-form-item-label-font-size: 26rpx;
                --nut-form-item-label-font-size: 500;
                --nut-form-item-body-font-size: 20rpx;
            "
        >
            <div class="wfull bg-#fff b-rd-12">
                <nut-form-item label="店铺名称" required>
                    <nut-input v-model="from.shopName" placeholder="请填写（必填）" />
                </nut-form-item>
                <nut-form-item label="商家主营分类" required>
                    <nut-input v-model="from.sortId" placeholder="请填写（必填）" />
                </nut-form-item>
                <nut-form-item label="店铺详细地址">
                    <nut-input v-model="from.sortId" placeholder="请填写店铺详细地址" />
                </nut-form-item>
            </div>

            <div class="wfull bg-#fff b-rd-12 mt20">
                <nut-form-item label="联系人姓名" required>
                    <nut-input v-model="from.contactName" placeholder="请输入真实姓名" />
                </nut-form-item>
                <nut-form-item label="身份证号">
                    <nut-input v-model="from.identityCode" placeholder="请填写" />
                </nut-form-item>
                <nut-form-item label="联系电话" required>
                    <nut-input v-model="from.address" placeholder="请填写您的电话号码" />
                </nut-form-item>
                <nut-form-item label="验证码">
                    <nut-input v-model="from.msgCode" placeholder="请填写（必填）" />
                </nut-form-item>
            </div>
        </nut-form>

        <div :style="bottomStyle" class="box-border px32 flex-center">
            <div class="wfull h78 bg-#FFAA48 text-#fff flex-center b-rd-8 text-26 fw500">申请入驻</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.nut-cell-group__wrap) {
    background-color: transparent !important;
    .nut-form-item {
        background-color: transparent !important;
        .nut-form-item__label {
            font-weight: 500;
            color: #000;
        }
    }
}
</style>
