// 引入 axios
import { alertMessage } from '../util/base'
import axios from "axios";
// 封装 baseURL
const request = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  // baseURL:" http://buvyvlev25pt.guyubao.com/api"
});

//响应拦截
request.interceptors.response.use(
  (res) => {
    if (res.data.code == 200) {
      alertMessage(res.data.message, "success");
    }
    return res.data;
  },
  (err) => {
    alertMessage(err, "error");
    console.log(err);
  }
);

export default request;
