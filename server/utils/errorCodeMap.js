const errorCodeMap = {
    USER_NOT_FOUND: {
      code: 400,
      message: "查询失败，用户信息不存在",
    },
    DATABASE_ERROR: {
      code: 400,
      message: "数据库错误",
    },
  };
  
  const handleErrorResponse = (errorCode, additionalData) => {
    const errorInfo = errorCodeMap[errorCode];
    if (!errorInfo) {
      throw new Error(`找不到${errorCode}`);
    }
  
    const { code, message } = errorInfo;
    return returnObjFormat(code, message, additionalData);
  };
  handleErrorResponse(200)