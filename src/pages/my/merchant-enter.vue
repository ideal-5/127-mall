<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref, computed } from "vue";
import { useUpload } from "@/hooks/useUpload";
import { shopEnterApi, configGetShopSortListApi } from "@/api";
import type { Shop, Config } from "@/api";
import type { PickerBaseEvent } from "nutui-uniapp";

const shopSortList = ref<Config.ConfigShopSortResult[]>();
onMounted(async () => {
    let { data } = await configGetShopSortListApi({ page: 1, limit: 9999 });
    shopSortList.value = data;
});
const activeShopSortText = computed(() => {
    return shopSortList.value?.find((item) => item.id === from.value.sortId)?.name || "";
});
const showShopSortPopup = ref(false);
const shopSortListOptions = computed(() => {
    return shopSortList.value?.map((item) => {
        return {
            text: item.name,
            value: item.id,
        };
    });
});
const popupConfirm = (selected: PickerBaseEvent) => {
    from.value.sortId = selected.selectedOptions[0].value as number;
    showShopSortPopup.value = false;
};

const from = ref<Shop.ShopEnterParamse>({
    address: "",
    backImage: "",
    contactName: "",
    contactPhone: "",
    faceImage: "",
    identityCode: "",
    imageList: [],
    msgCode: '',
    shopLogo: "",
    shopName: "",
    sortId: 0,
});

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(120);

const { selectImage, uploadFiles } = useUpload();

const uploadClisk = async (key: "shopLogo" | "faceImage" | "backImage" | "imageList") => {
    if (from.value[key] instanceof Array) {
        let imgarr = await selectImage(9 - from.value[key].length);
        let imagearr = await uploadFiles(imgarr);
        from.value[key].push(...imagearr);
    } else if (typeof from.value[key] === "string") {
        let imgarr = await selectImage(1);
        let imagearr = await uploadFiles(imgarr);
        (from.value[key] as string) = imagearr[0];
    }
};
const delClick = (key: "shopLogo" | "faceImage" | "backImage" | "imageList", index?: number) => {
    if (from.value[key] instanceof Array && index !== undefined) {
        from.value[key].splice(index, 1);
    } else if (typeof from.value[key] === "string") {
        (from.value[key] as string) = "";
    }
};

const submitClick = async () => {
    shopEnterApi(from.value);
};
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
                <nut-form-item label="店铺名称">
                    <nut-input v-model="from.shopName" placeholder="请填写（必填）" />
                </nut-form-item>
                <nut-form-item label="商家主营分类" required>
                    <!--  v-model="from.sortId" -->
                    <nut-input
                        :modelValue="activeShopSortText"
                        readonly
                        placeholder="请填写（必填）"
                        @click="showShopSortPopup = true"
                    />
                </nut-form-item>
                <nut-form-item label="店铺详细地址">
                    <nut-input v-model="from.address" placeholder="请填写店铺详细地址" />
                </nut-form-item>
            </div>

            <div class="wfull bg-#fff b-rd-12 my20">
                <nut-form-item label="联系人姓名">
                    <nut-input v-model="from.contactName" placeholder="请输入真实姓名" />
                </nut-form-item>
                <nut-form-item label="身份证号">
                    <nut-input v-model="from.identityCode" placeholder="请填写" />
                </nut-form-item>
                <nut-form-item label="联系电话" required>
                    <nut-input v-model="from.contactPhone" placeholder="请填写您的电话号码" />
                </nut-form-item>
                <nut-form-item label="验证码">
                    <nut-input v-model="from.msgCode" placeholder="请填写（必填）" />
                </nut-form-item>
            </div>

            <div class="wfull bg-#fff b-rd-12">
                <nut-form-item label="店铺LOSO" required>
                    <div class="size-152 b-rd-6 bg-#EBEBEB text-#949494 relative">
                        <div wfull hfull flex-center flex-col @click="uploadClisk('shopLogo')" v-if="!from.shopLogo">
                            <div i-mdi:camera-plus-outline class="size-42"></div>
                            <div text-18 mt10>添加图片</div>
                        </div>
                        <image v-else :src="from.shopLogo" mode="aspectFill" class="wfull hfull b-rd-6" />
                        <span
                            i-mdi:close-circle-outline
                            class="absolute top-0 right-0 translate-x-50% -translate-y-50% text-#000"
                            @click="delClick('shopLogo')"
                            v-if="from.shopLogo"
                        ></span>
                    </div>
                </nut-form-item>
                <nut-form-item label="服务介绍图" required>
                    <div class="wfull flex flex-wrap">
                        <div
                            class="size-152 b-rd-6 bg-#EBEBEB text-#949494 relative mr25 mb25 flex-shrink-0"
                            v-for="(item, index) in from.imageList"
                            :key="item"
                        >
                            <image :src="item" mode="aspectFill" class="wfull hfull b-rd-6" />
                            <span
                                i-mdi:close-circle-outline
                                class="absolute top-0 right-0 translate-x-50% -translate-y-50% text-#000"
                                @click="delClick('imageList', index)"
                            ></span>
                        </div>
                        <div class="size-152 b-rd-6 bg-#EBEBEB text-#949494 relative" v-if="from.imageList.length < 9">
                            <div class="wfull hfull flex-center flex-col" @click="uploadClisk('imageList')">
                                <div i-mdi:camera-plus-outline class="size-42"></div>
                                <div text-18 mt10>添加图片</div>
                            </div>
                        </div>
                    </div>
                </nut-form-item>
                <nut-form-item label="身份证正面(人像面)">
                    <div class="size-152 b-rd-6 bg-#EBEBEB text-#949494 relative">
                        <div wfull hfull flex-center flex-col @click="uploadClisk('faceImage')" v-if="!from.faceImage">
                            <div i-mdi:camera-plus-outline class="size-42"></div>
                            <div text-18 mt10>添加图片</div>
                        </div>
                        <image v-else :src="from.faceImage" mode="aspectFill" class="wfull hfull b-rd-6" />
                        <span
                            i-mdi:close-circle-outline
                            class="absolute top-0 right-0 translate-x-50% -translate-y-50% text-#000"
                            @click="delClick('faceImage')"
                            v-if="from.faceImage"
                        ></span>
                    </div>
                </nut-form-item>
                <nut-form-item label="身份证反面(国徽面)">
                    <div class="size-152 b-rd-6 bg-#EBEBEB text-#949494 relative">
                        <div wfull hfull flex-center flex-col @click="uploadClisk('backImage')" v-if="!from.backImage">
                            <div i-mdi:camera-plus-outline class="size-42"></div>
                            <div text-18 mt10>添加图片</div>
                        </div>
                        <image v-else :src="from.backImage" mode="aspectFill" class="wfull hfull b-rd-6" />
                        <span
                            i-mdi:close-circle-outline
                            class="absolute top-0 right-0 translate-x-50% -translate-y-50% text-#000"
                            @click="delClick('backImage')"
                            v-if="from.backImage"
                        ></span>
                    </div>
                </nut-form-item>
            </div>
        </nut-form>

        <div :style="bottomStyle" class="box-border px32 flex-center">
            <div class="wfull h78 bg-#FFAA48 text-#fff flex-center b-rd-8 text-26 fw500" @click="submitClick">
                申请入驻
            </div>
        </div>
    </div>
    <nut-popup v-model:visible="showShopSortPopup" position="bottom" safe-area-inset-bottom>
        <nut-picker :columns="shopSortListOptions" title="选择主营分类" @confirm="popupConfirm"> </nut-picker>
    </nut-popup>
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
