<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import pcaData from "@/constants/pca-code.json";
import { addressAddApi, addressUpdateApi } from "@/api";
import type { Address } from "@/api";

interface AddressItem {
    name: string;
    id?: string;
}
interface Pca {
    code: string;
    name: string;
    children?: Pca[];
}
const toast = useToast();

const pca: Pca[] = pcaData;

const params = ref<Address.AddParams>({
    address: "",
    doorplate: "", // 详细地址
    contactName: "",
    contactPhone: "",
});

const showCityPopup = ref(false);
const province = computed<AddressItem[]>(() => {
    return pca.map((item) => ({
        name: item.name,
        id: item.code,
    }));
});
const city = ref<AddressItem[]>([{ id: "00", name: "未知" }]);
const country = ref<AddressItem[]>([{ id: "6", name: "未知" }]);

const activeAddress = ref<{ province: AddressItem; city: AddressItem; country: AddressItem }>({
    province: { name: "", id: "" },
    city: { name: "", id: "" },
    country: { name: "", id: "" },
});

const cityChange = (e: { next?: string | undefined; value?: AddressItem; custom: string }) => {
    const { next, value } = e;
    if (!value?.name) return;

    const activeProvince = pca.find(
        (item) => item.code === (next === "city" ? value.id : activeAddress.value.province.id)
    );
    if (!activeProvince) return;

    if (next === "city") {
        console.log(value);
        activeAddress.value.province = value;
        city.value = activeProvince.children?.map(({ name, code }) => ({ name, id: code })) || [];
    } else if (next === "country") {
        activeAddress.value.city = value;
        const activeCity = activeProvince.children?.find(({ code }) => code === value.id);
        country.value = activeCity?.children?.map(({ name, code }) => ({ name, id: code })) || [];
    }
};

type closeEvent = {
    province: AddressItem;
    city: {
        name: string;
        id?: string;
    };
    country: AddressItem;
};
const addressClose = (e: { data: closeEvent; type: string }) => {
    let {
        data: { province, city, country },
        type,
    } = e;
    activeAddress.value = { province, city, country };
    params.value.address = `${activeAddress.value.province.name} ${activeAddress.value.city.name} ${activeAddress.value.country.name}`;
};

async function submit() {
    for (const key of Object.keys(params.value) as Array<keyof typeof params.value>) {
        console.log("params.value[key]", params.value[key]);
        if (!params.value[key]) {
            toast.warning("请将数据填写完整");
            return;
        }
    }
    if (!activeEditItem.value?.id) {
        await addressAddApi(params.value);
        toast.success("添加成功");
    } else {
        await addressUpdateApi({ ...params.value, id: activeEditItem.value.id });
        toast.success("修改成功");
    }

   
    setTimeout(() => {
        uni.navigateBack();
    }, 600);
}

/**
 * 编辑
 */
const activeEditItem = ref<Address.Detail>();
onMounted(() => {
    const instance = getCurrentInstance()?.proxy;
    if (!instance) return;
    const eventChannel = instance.getOpenerEventChannel();
    eventChannel.on("addressDetail", function (data: Address.Detail) {
        for (const key of Object.keys(params.value) as Array<keyof typeof params.value>) {
            params.value[key] = data[key];
        }
        activeEditItem.value = data;
    });
});
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
                    v-model="params.address"
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
                    v-model="params.doorplate"
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
                    v-model="params.contactName"
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
                    v-model="params.contactPhone"
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

        <div class="w660 h72 flex-center text-#fff text-30 font-500 bg-#FFAA48 b-rd-full mt-100" @click="submit">
            保存地址
        </div>
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
