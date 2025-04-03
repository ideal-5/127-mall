// import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { DefaultBaseUrl, DefaultHeaders } from "@/constants";
import { useUserStore } from "@/store";
// import { MutationCache, QueryCache, QueryClient } from '@tanstack/vue-query'
import un from "@uni-helper/uni-network";
// import qs from 'qs'
// import { showNetworkError } from "./helper";
import { handleHttpError, handleServerError } from "./handleError";
import { gotoPage } from "@/utils/uni";

const instance = un.create({
    baseUrl: DefaultBaseUrl,
    timeout: 30_000,
});

instance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();

        // console.log("config", config);
        let headers: Record<string, string> = {};

        if ((config.method === "POST" || config.method === "post") && !config.headers) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        config.headers = {
            ...DefaultHeaders,
            token: userStore.token,
            // 'X-Token': authStore.token,
            // 'X-Access-Token': authStore.token,
            ...headers,
            ...config.headers,
        };

        return config;
    },
    (error) => {
        console.log("请求err", error.response);

        // throw new Error(error);
    }
);
// instance.interceptors.response.use(
//     (response) => {
//         const data = response as IUnResponse
//         // return response.data;
//     },
//     (error) => {
//         throw new Error(error);
//     }
// );
instance.interceptors.response.use(
    (response) => {
        const data = response as IUnResponse;

        // 牛 返回的data 在上传文件的时候是JSON字符串
        if (typeof data.data === "string") {
            data.data = JSON.parse(data.data);
        }
        /**
         * 处理服务器业务错误码
         */

        if (data.data?.code !== 200) {
            if (data.data?.code === 401) {
                return gotoPage("/pages/login/login");
            }
            let msg = handleServerError(data.data?.code, data.data?.msg);
            uni.showToast({
                title: msg || data.data?.msg || "未知错误",
                icon: "none",
            });

            // throw new Error('123456');
            throw response.data;
        }

        // console.log("response", response);
        return response.data as any;
    },
    (error) => {
        console.log("响应err", error.response.status);
        console.log("响应config", error.config);
        let msg = handleHttpError(error.response.status);
        uni.showToast({
            title: msg,
            icon: "none",
        });
        throw new Error(error);
    }
);

export { instance as unInstance };

// export const vueQueryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: (error) => {
//       if (un.isCancel(error))
//         return
//       showNetworkError({ error: error as IUnError })
//     },
//   }),
//   mutationCache: new MutationCache({
//     onError: (error) => {
//       if (un.isCancel(error))
//         return
//       showNetworkError({ error: error as IUnError })
//     },
//   }),
// })

// export const vueQueryPluginOptions: VueQueryPluginOptions = {
//   queryClient: vueQueryClient,
// }
