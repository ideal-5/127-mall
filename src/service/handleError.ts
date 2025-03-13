function handleError(code: number) {
    const errorMap: Record<number, string> = {
      400: '请求错误，请检查输入信息',
      401: '未授权，请登录',
      403: '禁止访问',
      404: '资源未找到',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
    };
    const message = errorMap[code] || '未知错误，请稍后重试';
    return message;
  }
  
