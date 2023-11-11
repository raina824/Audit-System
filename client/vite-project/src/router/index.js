import * as VueRouter from "vue-router";
import { login } from "../api/index.Js";
import { useStore } from "../store/index.js";
let { createRouter, createWebHistory } = VueRouter;

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/main",
    name: "Mian",
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "ownInfo",
        name: "ownInfo",
        component: () => import("../views/Layout/Main/index.vue"),
      },
      {
        path: "approveInfo",
        name: "approveInfo",
        component: () => import("../views/Layout/Main/approval.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.pushbeforeEach(async (to, from, next) => {
//   let store = useStore();
//   let res = await login({
//     username: store.userInfo.username,
//     password: store.userInfo.password,
//   });
//   store.userInfo = res.data;
//   next();
//   // 判断有没有登录
//   // if (!localStorage.getItem('token')) {
//   // 	if (to.name == "login") {
//   // 		next();
//   // 	} else {
//   // 		router.push('login')
//   // 	}
//   // } else {
//   // 	next();
//   // }
// });
export default router;
