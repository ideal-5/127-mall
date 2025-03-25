// import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { DefaultBaseUrl, DefaultHeaders } from "@/constants";
// import { useAuthStore } from '@/store'
// import { MutationCache, QueryCache, QueryClient } from '@tanstack/vue-query'
import un from "@uni-helper/uni-network";
// import qs from 'qs'
import { showNetworkError } from "./helper";

const instance = un.create({
    baseUrl: DefaultBaseUrl,
    timeout: 30_000,
});

instance.interceptors.request.use((config) => {
    // const authStore = useAuthStore()
    // console.log("config", config);

    let headers: Record<string, string> = {};

    if ((config.method === "POST" || config.method === "post") && !config.headers) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    config.headers = {
        ...DefaultHeaders,
        // 'token': authStore.token,
        // 'X-Token': authStore.token,
        // 'X-Access-Token': authStore.token,
        ...headers,
        ...config.headers,
    };

    return config;
});
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
        // const data = response as IUnResponse;
        // console.log("response");
        // if (response.config?.showError ?? true) {
        //   showNetworkError({
        //     response: response as unknown as IUnResponse,
        //     error: data?.data as unknown as IUnError,
        //     type: data.config?.showErrorType,
        //   })
        // }
        console.log('response', response);
        return response.data as any;
    },
    (error) => {
        console.log("error", error);
        // throw new Error(error);
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
