/**
 * 返回整洁的对象数据格式
 * @param {状态码} code
 * @param {信息} message
 * @param {数据} data
 */
function returnObjFormat(code, message, data) {
  let formattedData = null;
  if (data !== null && typeof data !== 'undefined') {
    const dataArray = JSON.parse(JSON.stringify(data));
    formattedData = dataArray.length > 0 ? dataArray[0] : null;
  }
  return {
    code,
    message,
    data: formattedData
  };
}

// 使用orm查询后 自带的tojson方法不管用
//所以需要手动封装 提高代码复用
/**
 *
 * @param {传对象形式 用id} username
 * @param {*} socket
 * @returns
 */
const returnJsonFormat=(data)=>{
  // console.log('处理后的结果',JSON.parse(JSON.stringify(data))[0]);
  return JSON.parse(JSON.stringify(data))
}
module.exports = {
  returnObjFormat,returnJsonFormat
};
