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
    config.headers = {
        ...DefaultHeaders,
        // 'token': authStore.token,
        // 'X-Token': authStore.token,
        // 'X-Access-Token': authStore.token,
        ...config.headers,
    };
    return config;
});
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
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
