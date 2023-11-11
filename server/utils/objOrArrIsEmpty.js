// 不是空对象 返回假
function isEmptyObject(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0;
}
module.exports = {
  isEmptyObject,
  isEmptyArray,
};
