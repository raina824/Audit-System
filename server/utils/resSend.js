/**
 * 返回整洁的数据格式
 * @param {响应} res
 * @param {返回对象} msg
 */
function resSend(res, msg) {
    res.send(msg);
  }

  module.exports = {
    resSend
  }