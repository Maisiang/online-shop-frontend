import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 載入共用css檔案
import './assets/css/common.css'
import './assets/css/reset.css'


import axios from "axios";
axios.interceptors.response.use(
    // 判斷用戶是否登入
    response => {
        // 沒有登入 - 清空Session
        if(response.data.isLogin===false){
            if(sessionStorage.getItem('user-info')) sessionStorage.removeItem('user-info');
        }
        // 將response繼續傳遞
        return response;
    },
    // 判斷Server是否運行
    error => {
        alert('Server目前不在...請稍後再試');
        throw error;
    }
);


createApp(App).use(router).mount("#app");
