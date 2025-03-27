import { unInstance } from "@/service";

export namespace Config {
    export interface AgreementParams {
        type: "10" | "20" | "30" | "40" | "50" | "60" | "70";
    }
    export interface AgreementResult {
        name: string;
        policy: string;
        type: string;
    }
}

// 获取协议
export const configGetAgreementApi = (params: Config.AgreementParams) => {
    return unInstance.get<UnData, Config.AgreementParams, IUnResponseData<null, Config.AgreementResult>>(
        `/sys/getPolicy`,
        { params }
    );
};
