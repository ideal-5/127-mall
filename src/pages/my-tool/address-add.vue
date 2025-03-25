<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import pcaData from "@/constants/pca-code.json";

interface Params {
    region: string;
    address: string;
    name: string;
    phone: string;
}

interface Address {
    name: string;
    id: string;
}
interface Pca {
    code: string;
    name: string;
    children?: Pca[];
}

const pca: Pca[] = pcaData;

const params = ref<Params>({
    region: "",
    address: "",
    name: "",
    phone: "",
});

const showCityPopup = ref(false);
const province = computed<Address[]>(() => {
    return pca.map((item) => ({
        name: item.name,
        id: item.code,
    }));
});
const city = ref<Address[]>([{ id: "00", name: "未知" }]);
const country = ref<Address[]>([{ id: "6", name: "未知" }]);

const activeAddress = ref<{ province: Address; city: Address; country: Address }>({
    province: { name: "", id: "" },
    city: { name: "", id: "" },
    country: { name: "", id: "" },
});

const cityChange = (e: { next?: string; value?: Address; custom: string }) => {
    const { next, value } = e;
    if (!value?.name) return;

    const activeProvince = pca.find(
        (item) => item.code === (next === "city" ? value.id : activeAddress.value.province.id)
    );
    if (!activeProvince) return;

    if (next === "city") {
        activeAddress.value.province = value;
        city.value = activeProvince.children?.map(({ name, code }) => ({ name, id: code })) || [];
    } else if (next === "country") {
        activeAddress.value.city = value;
        const activeCity = activeProvince.children?.find(({ code }) => code === value.id);
        country.value = activeCity?.children?.map(({ name, code }) => ({ name, id: code })) || [];
    }
};

type closeEvent = { province: Address; city: Address; country: Address };
const addressClose = (e: { data: closeEvent; type: string }) => {
    let {
        data: { province, city, country },
        type,
    } = e;
    activeAddress.value = { province, city, country };
    params.value.region = `${activeAddress.value.province.name} ${activeAddress.value.city.name} ${activeAddress.value.country.name}`;
};
</script>

<template>
    <div class="main flex flex-col items-center">
        <NavBar style="--my-navbar-border-bottom-color: #f2f2f2">添加地址</NavBar>
        <div class="wfull flex box-border py20 pr20" @click="showCityPopup = true">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:map-marker-radius"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="params.region"
                    placeholder="请输入所在区域"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                    input-class="!text-align-right"
                    readonly
                >
                    <template #left>
                        <span class="text-26 font-500">所在区域</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex box-border py20 pr20">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:tag"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="params.address"
                    placeholder="请输入详细地址与门牌号"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                    input-class="!text-align-right"
                >
                    <template #left>
                        <span class="text-26 font-500">详细地址与门牌号</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex box-border py20 pr20">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:account"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="params.name"
                    placeholder="请输入收货人姓名"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                    input-class="!text-align-right"
                >
                    <template #left>
                        <span class="text-26 font-500">收货人姓名</span>
                    </template>
                </nut-input>
            </div>
        </div>
        <div class="wfull flex box-border py20 pr20">
            <div class="w100 flex-shrink-0 flex-center">
                <div class="i-mdi:phone"></div>
            </div>
            <div class="flex-1 min-w0 border-b-solid border-b-1rpx border-b-#D6D6D6">
                <nut-input
                    v-model="params.phone"
                    placeholder="请输入手机号码"
                    :border="false"
                    style="--nut-input-padding: 10px 0; --nut-input-font-size: 24rpx"
                    input-class="!text-align-right"
                >
                    <template #left>
                        <span class="text-26 font-500">手机号</span>
                    </template>
                </nut-input>
            </div>
        </div>

        <div class="w660 h72 flex-center text-#fff text-30 font-500 bg-#FFAA48 b-rd-full mt-100">保存地址</div>
    </div>

    <nut-address
        v-model:visible="showCityPopup"
        :province="province"
        :city="city"
        :country="country"
        @change="cityChange"
        @close="addressClose"
        custom-address-title="请选择所在地区"
    ></nut-address>
</template>
