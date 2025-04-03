import { shopCartListApi, shopCartAddApi, shopCartDeleteApi, shopCartUpdateCountApi } from "@/api";
import type { ShopCart } from "@/api";
import { defineStore } from "pinia";
import { useUserStore } from "@/store";

export const useShopCartStore = defineStore("shopCart", () => {
    const userStore = useUserStore();
    const shopCartList = ref<
        {
            cartList: (ShopCart.Product & { activePrice: number; isSelect: boolean })[];
            shopLogo: string;
            shopName: string;
            isSelect: boolean;
        }[]
    >([]);
    const total = ref(0);

    async function getShopCartList() {
        let { data, total: temTotal } = await shopCartListApi({
            page: 1,
            limit: 200,
        });
        let mydata = data.map((shop) => {
            return {
                ...shop,
                cartList: shop.cartList.map((item) => ({
                    ...item,
                    isSelect: false,
                    activePrice: userStore.user?.vipStatus === "20" ? item.currentPrice : item.price,
                })),
                isSelect: false,
            };
        });
        shopCartList.value = mydata;
        if (temTotal) {
            total.value = temTotal;
        }
    }

    async function shopCartAdd(skuId: number) {
        await shopCartAddApi({ skuId });
        await getShopCartList();
    }

    async function shopCartDelete(ids: string) {
        await shopCartDeleteApi({ ids });
        await getShopCartList();
    }

    async function shopCartUpdateCount(params: { id: number; stock: number }) {
       await shopCartUpdateCountApi(params);
       await getShopCartList();
    }

    return { shopCartList, total, shopCartAdd, getShopCartList, shopCartDelete, shopCartUpdateCount };
});
