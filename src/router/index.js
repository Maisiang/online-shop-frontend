import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import axios from "axios";


async function isLogin(from){
  // 如果沒有session，需要跟Server請求 (可能新開個分頁而沒有)
  if(!sessionStorage.getItem('user-info')){
    await axios.get('/api/isLogin').then((response)=>{
      // 確認為登入狀態
      if(response.data.isLogin===true){
        sessionStorage.setItem('user-info',JSON.stringify(response.data.userInfo));
      }
      // 未登入
      else{
        if(from.path==='/login'){
          alert('請先登入會員！');
          router.replace('/login');

        }
        // 使用replace避免循環重定向
        else router.push('/login');
        return false;
      }
    })
  }
  // 有session則進到路由頁面 (假設登入，如果Session未被清空則需要靠攔截器)
  else{
    return true
  }
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

