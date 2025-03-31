import { unInstance } from "@/service";

// 文件1
export namespace Address {
    export interface Paging {
        page: number | string;
        limit: number | string;
    }
    export interface Detail {
        id: number;
        address: string;
        doorplate: string; // 详细地址
        contactName: string;
        contactPhone: string;
        defaultStatus: "10" | "20"; // 10: 默认地址 20: 非默认地址
    }
    export interface AddParams {
        address: string;
        doorplate: string; // 详细地址
        contactName: string;
        contactPhone: string;
    }
}

// 地址列表
export const addressListApi = (data: Address.Paging) => {
    return unInstance.post<UnData, Address.Paging, IUnResponseData<Address.Detail[], null>>(
        "/v1/user/userAddressList",
        data
    );
};

// 添加地址
export const addressAddApi = (data: Address.AddParams) => {
    return unInstance.post<UnData, Address.AddParams, IUnResponseData<null, null>>("/v1/user/addAddress", data);
};

// 改变默认地址状态
export const addressChangeDefaultStatusApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<null, null>>(
        "/v1/user/checkDefaultAddress",
        data
    );
};

// 删除地址
export const addressDeleteApi = (data: { id: number }) => {
    return unInstance.post<UnData, { id: number }, IUnResponseData<null, null>>("/v1/user/userDeleteAddress", data);
};

// 编辑修改地址
export const addressUpdateApi = (data: Address.AddParams & { id: number }) => {
    return unInstance.post<UnData, Address.AddParams & { id: number }, IUnResponseData<null, null>>(
        "/v1/user/updateAddress",
        data
    );
};
