import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/assets/scripts/store';

// 載入共用css檔案
import './assets/css/common.css'
import './assets/css/reset.css'

createApp(App).use(router).use(store).mount('#app');

