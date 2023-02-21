import axios from 'axios';
import store from '@/assets/scripts/store';
import router from '@/router';

// 建立各API的Axios實體
const URL = 'https://itdove.onrender.com';
//const URL = 'http://itdove.ddns.net:3000';
const productRequest = axios.create({
    baseURL: URL + '/api/product/',
    withCredentials: true
});
const cartRequest = axios.create({
    baseURL: URL + '/api/cart/',
    withCredentials: true
});
const userRequest = axios.create({
    baseURL: URL + '/api/user/',
    withCredentials: true
});
const transactionRequest = axios.create({
    baseURL: URL + '/api/transaction/',
    withCredentials: true
});

// 商品
export const apiProduct = data => productRequest.get('',data);

// 購物車
export const apiCart        = ()            => cartRequest.get();
export const apiCartAdd     = (product_id)  => cartRequest.post(product_id);
export const apiCartRemove  = (product_id)  => cartRequest.delete(product_id);

// 用戶
export const apiUserInfo    = ()    => userRequest.get();
export const apiUserRegister= data  => userRequest.post('/register', data, {header:{'content-type': 'multipart/form-data'}});
export const apiUserPassword= data  => userRequest.put('/password', data);
export const apiUserAvatar  =  data => userRequest.put('/avatar', data, {header:{'content-type': 'multipart/form-data'}});

// 用戶 - Session API
export const apiUserLogin       = data  => userRequest.post('/login', data);
export const apiUserLogout      = ()    => userRequest.post('/logout');
export const apiUserLoginStatus = ()    => userRequest.get('/loginStatus');

// 交易
export const apiTransaction     = ()    => transactionRequest.get();
export const apiTransactionAdd  = data  => transactionRequest.post('',data);

// Request攔截器
const reqInterceptors = (instance)=>{
    instance.interceptors.request.use(
    config => {
        store.commit('changeLoading', true);
        return config;
    }, 
    error => {
        throw error;
    });
}
reqInterceptors(productRequest);
reqInterceptors(cartRequest);
reqInterceptors(userRequest);
reqInterceptors(transactionRequest);
  
// Response攔截器
const resInterceptors = (instance)=>{
    instance.interceptors.response.use(
    response => {   
        store.commit('changeLoading', false);
        return response;
    }, 
    error => {
        store.commit('changeLoading', false);
        if (error.response.status === 401){
            alert('請先登入會員')
            router.push('/login');
        }
        else{
            alert('Server目前不在...請稍後再試');
            throw error;
        }
    });
}
resInterceptors(productRequest);
resInterceptors(cartRequest);
resInterceptors(userRequest);
resInterceptors(transactionRequest);

