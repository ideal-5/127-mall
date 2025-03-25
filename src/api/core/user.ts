import { unInstance } from "@/service";

export function ceshiApi() {
    return unInstance.get<any>("/sys/getVipConfig");
}
export function ceshiApi2(data: { configName: string }) {
    return unInstance.post<UnData, { configName: string }, IUnResponseData<{ wwwww: number }, { bo: string }>>(
        "/sys/getSysConfig5",
        data
    );
}
