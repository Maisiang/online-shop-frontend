import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import axios from "axios";

async function isLogin(){
  if(!sessionStorage.getItem('user-info'))
  {
    await axios.get('/api/isLogin').then((response)=>{
      if(response.data.isLogin===true){
        sessionStorage.setItem('user-info',JSON.stringify(response.data.username))
        return true;
      }
      else{
        router.replace('/login');
        return false;
      }
    })
  }
  else return true;
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    redirect : '/',
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    // 導航守衛 Navigation guard
    beforeEnter:(to,from)=>{
      return isLogin();
    },
    component: () => import("../views/CartView.vue"),
  },
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
      return isLogin();
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

