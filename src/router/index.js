import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import { apiUserisLogin } from "@/assets/scripts/api";

async function isLogin(from){
  await apiUserisLogin().then((response)=>{
    if(response.data.isLogin===true){
      sessionStorage.setItem('user-info',JSON.stringify(response.data.userInfo));
      return true;
    }
    else{
      // 清空Session
      if(sessionStorage.getItem('user-info'))
        sessionStorage.removeItem('user-info')
      // 轉到登入頁面
      if(from.path==='/login'){
        alert('請先登入會員！');
        // 使用replace避免循環重定向
        router.replace('/login');
      }
      else 
        router.push('/login');
      return false;
    }
  })
}

const routes = [
  // 首頁
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    redirect : '/home',
  },
  // 商品頁
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductView.vue"),
  },
  // 購物車 - 需要驗證
  {
    path: "/cart",
    name: "cart",
    // 導航守衛 Navigation guard
    beforeEnter:(to,from)=>{
      return isLogin(from);
    },
    component: () => import("../views/CartView.vue"),
  },
  // 用戶 - 需要驗證
  {
    path: "/users",
    name: "Users",
    children:[
      {
        path:"",
        name:"profile",
        component: () => import("../views/users/Profile.vue"),
      },
      {
        path:"transaction",
        name:"transaction",
        component: () => import("../views/users/Transaction.vue"),
      },
      {
        path:"updatepwd",
        name:"updatepwd",
        component: () => import("../views/users/UpdatePwd.vue"),
      },
    ],
    // 導航守衛 Navigation guard
    beforeEnter:(to,from)=>{
      return isLogin(from);
    },
    component: () => import("../views/UsersView.vue"),
  },
  {
    path: "/search",
    //name: "search",
    children:[
      {
        path: "",
        name: "search-home",
        component: () => import("@/views/search/Home.vue"),
      },
      {
        path: "list",
        name: "search-list",
        component: () => import("@/views/search/List.vue"),
      }
    ],
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 切換頁面移到最上方
router.afterEach((to, from,next) => {
  window.scrollTo(0,0);
})
export default router;

