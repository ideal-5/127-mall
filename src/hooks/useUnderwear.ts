import { configGetBannerListApi, underwearProductListApi } from "@/api";
import type { Config } from "@/api";
import { onMounted, ref } from "vue";
export const useUnderwear = () => {
    const searchValue = ref("");

    /**
     * 轮播图
     */
    const bannerList = ref<Config.BannerResult[]>([]);
    onMounted(async () => {
        let { data } = await configGetBannerListApi({ type: "20", page: 1, limit: 99999 });
        bannerList.value = data;
    });

    /**
     * 列表
     */
    function createGetList(type: string) {
        let sortConfig = type;
        const paging = {
            page: 1,
            limit: 10,
        };
        return async (isPush: boolean = false) => {
            let { data } = await underwearProductListApi({
                page: isPush ? paging.page + 1 : 1,
                limit: paging.limit,
                sortConfig,
                merchName: searchValue.value,
            });
            if (isPush) {
                if (data.length === 0) return [];
                paging.page++;
            } else {
                paging.page = 1;
            }
            return data;
        };
    }

    return { searchValue, bannerList, createGetList };
};
