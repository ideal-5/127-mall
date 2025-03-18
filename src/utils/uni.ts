type NavigateMethod = "navigateTo" | "redirectTo" | "switchTab" | "reLaunch";

export const gotoPage = (url: string, params: Record<string, any> = {}, method: NavigateMethod = "navigateTo") => {
    if (!(method in uni)) {
        console.error(`错误: 不支持的方法 ${method}`);
        return;
    }

    // 处理参数拼接
    const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // 使用 as 断言让 TS 知道 uni[method] 是一个可调用函数
    (uni[method] as (options: UniApp.NavigateToOptions) => void)({ url: fullUrl });
};
