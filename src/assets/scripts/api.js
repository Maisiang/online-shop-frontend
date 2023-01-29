import axios from 'axios';

// 建立各API的Axios實體
const domain = 'http://itdove.ddns.net:3000'
const productRequest = axios.create({
    baseURL: domain+'/api/product/'
});
const cartRequest = axios.create({
    baseURL: domain+'/api/cart/'
});
const userRequest = axios.create({
    baseURL: domain+'/api/user/'
});
const transactionRequest = axios.create({
    baseURL: domain+'/api/transaction/'
});

// 商品
export const apiProduct = data => productRequest.get('',data);

// 購物車
export const apiCart        = ()            => cartRequest.get();
export const apiCartAdd     = (product_id)  => cartRequest.post(product_id);
export const apiCartRemove  = (product_id)  => cartRequest.delete(product_id);

// 用戶
export const apiUserInfo        = ()    => userRequest.get();
export const apiUserRegister    = data  => userRequest.post('/register', data, {header:{'content-type': 'multipart/form-data'}});
export const apiUserPassword    = data  => userRequest.put('/password', data);
export const apiUserAvatar     =  data  => userRequest.put('/avatar', data, {header:{'content-type': 'multipart/form-data'}});

// 用戶 - Session API
export const apiUserLogin   = data  => userRequest.post('/login', data);
export const apiUserLogout  = ()    => userRequest.post('/logout');
export const apiUserisLogin = ()    => userRequest.get('/isLogin');

// 交易
export const apiTransaction     = ()    => transactionRequest.get();
export const apiTransactionAdd  = data    => transactionRequest.post('',data);


// Response攔截器(判斷用戶是否登入)
const addInterceptors = (instance)=>{
    instance.interceptors.response.use(
    response => {
        // 沒有登入 - 清空Session
        if(response.data.isLogin===false &&
            sessionStorage.getItem('user-info')){
                 sessionStorage.removeItem('user-info')
         }
        return response;
    }, 
    error => {
        alert('Server目前不在...請稍後再試');
        throw error;
    });
}
addInterceptors(cartRequest);
addInterceptors(userRequest);
addInterceptors(transactionRequest);