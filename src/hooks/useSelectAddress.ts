import { ref, onMounted } from "vue";
import { addressGetDefaultApi } from "@/api";
import type { Address } from "@/api";
export function useSelectAddress() {
    /**
     * 地址
     */
    const activeAddress = ref<Address.Detail | null>(null);
    onMounted(async () => {
        let { body } = await addressGetDefaultApi();
        activeAddress.value = body;
    });

    // 选择地址
    function selectAddress() {
        uni.navigateTo({
            url: "/pages/my-tool/address-list",
            events: {
                selectWinAddress: function (data: Address.Detail) {
                    activeAddress.value = data;
                },
            },
            success: function (res) {
                res.eventChannel.emit("activeAddress", activeAddress.value);
            },
        });
    }

    return { activeAddress, selectAddress };
}
