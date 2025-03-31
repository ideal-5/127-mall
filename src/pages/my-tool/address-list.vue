<script setup lang="ts">
import { useStyle } from "@/hooks/useStyle";
import { ref, onMounted, getCurrentInstance } from "vue";
import { gotoPage } from "@/utils/uni";
import { addressListApi, addressChangeDefaultStatusApi, addressDeleteApi } from "@/api";
import type { Address } from "@/api";
import { onShow, onReachBottom } from "@dcloudio/uni-app";

const { bottomHeight, bottomStyle } = useStyle().absoluteBottom(150);

const defaultAddress = ref(true);
const toast = useToast();

const paging = {
    page: 1,
    limit: 10,
};

const list = ref<Address.Detail[]>([]);
async function getList(isPush: boolean = false) {
    let { data } = await addressListApi({
        page: isPush ? paging.page + 1 : 1,
        limit: paging.limit,
    });
    if (!data.length) return;
    if (isPush) {
        list.value.push(...data);
        paging.page++;
    } else {
        list.value = data;
        paging.page = 1;
    }
}

onShow(() => {
    getList();
});
onReachBottom(() => {
    getList(true);
});

async function changeSwitch(val: "10" | "20", item: Address.Detail) {
    await addressChangeDefaultStatusApi({ id: item.id });
    toast.success("修改成功");
    getList(false);
}

async function deleteAddress(item: Address.Detail) {
    await addressDeleteApi({ id: item.id });
    toast.success("删除成功");
    getList(false);
}

function editAddress(item: Address.Detail) {
    uni.navigateTo({
        url: "address-add",
        success: function (res) {
            res.eventChannel.emit("addressDetail", item);
        },
    });
}

/**
 * 商品跳转过来选中地址
 */
let eventChannel: any = null;
const activeAddress = ref<Address.Detail>();

onMounted(() => {
    const instance = getCurrentInstance()?.proxy;
    if (instance) {
        eventChannel = instance.getOpenerEventChannel();

        eventChannel.on("activeAddress", function (data: Address.Detail | null) {
            if (data) {
                activeAddress.value = data;
            }
            console.log("activeAddress", data);
        });
    }
});
function selectAddress(item: Address.Detail) {
    if (!eventChannel) return;
    eventChannel.emit("selectWinAddress", item);
    uni.navigateBack();
}
</script>

<template>
    <div class="main box-border" :style="{ paddingBottom: bottomHeight }">
        <NavBar barColor="#fff" style="--my-navbar-border-bottom-color: #f2f2f2">地址管理</NavBar>
        <div class="box-border px-32">
            <div
                class="w-full shadow-[0rpx_6rpx_12rpx_0rpx_rgba(0,0,0,0.1608)] b-rd-12 mt-30 last:mb-20"
                v-for="(item, index) in list"
                :key="item.id"
                @click="selectAddress(item)"
            >
                <div class="flex items-center box-border py-25 pr-20 px15">
                    <div class="w-70 flex-center flex-shrink-0" v-if="activeAddress && activeAddress.id === item.id">
                        <div class="size-40 flex-center bg-[#FFAA48] b-rd-full">
                            <span class="i-mdi:check text-#fff"></span>
                        </div>
                    </div>
                    <div class="text-26 flex-1 min-w-0 break-all">
                        <div>{{ item.address }}</div>
                        <div class="mb-20 mt-15">{{ item.doorplate }}</div>
                        <div class="text-#BFBFBF">
                            <span class="mr-20">{{ item.contactName }}</span>
                            <span>{{ item.contactPhone }}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="text-#818181 flex items-center justify-between border-t-#DBDBDB border-t-solid border-t-1 box-border py-25 pr-20 text-24"
                >
                    <div class="ml-70">
                        <nut-switch
                            :model-value="item.defaultStatus"
                            @update:model-value="(val:'10'|'20') => changeSwitch(val,item)"
                            active-value="10"
                            inactive-value="20"
                            active-color="#55BC8D"
                        />
                        <span class="ml-20">默认地址</span>
                    </div>
                    <div class="flex-center">
                        <div class="flex-center mr-30" @click.stop="editAddress(item)">
                            <span class="i-mdi:pencil-outline"></span>
                            <span>编辑</span>
                        </div>
                        <div class="flex-center" @click.stop="deleteAddress(item)">
                            <span class="i-proicons:delete"></span>
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :style="bottomStyle" class="flex-center box-border px-30">
            <div class="w-full flex-center text-#fff h-90 bg-#FFAA48 b-rd-full" @click="gotoPage('address-add')">
                +添加地址
            </div>
        </div>
    </div>
</template>
