import { defineStore } from "pinia";
import router from "../router/index";


export const useStore = defineStore("main", {
  state: () => ({
    userInfo: { },
    approvalData:[]
  }),



  // 开启数据持久化
  persist: true,
});
