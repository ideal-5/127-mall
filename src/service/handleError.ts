// export function handleError(code: number) {
//     const errorMap: Record<number, string> = {
//         400: "请求错误，请检查输入信息",
//         401: "未授权，请登录",
//         403: "禁止访问",
//         404: "资源未找到",
//         500: "服务器内部错误",
//         502: "网关错误",
//         503: "服务不可用",
//     };
//     const message = errorMap[code] || "未知错误，请稍后重试";
//     return message;
// }

export function handleHttpError(status?: number): string {
    // 处理 HTTP 状态码
    let msg = "未知错误，请稍后重试";
    switch (status) {
        case 404:
            msg = "资源未找到";
            break;
    }
    return msg;
}

export function handleServerError(code?: number, message?: string): string {
    // 处理服务器业务码
    let msg = "";
    switch (code) {
        case 500:
            msg = "服务器内部错误500";
            break;
    }
    return msg;
}
