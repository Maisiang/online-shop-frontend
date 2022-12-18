<template>
    <div class="tabbar noselect">
        <ul class="row">
            <li class="col center-center" v-for="(item,index) in routerList" :key='index'
                @click="switchTab(item.path)">
                <div class="tabbar-img">
                    <img :src="$route.path.includes(item.path)?item.selected:item.active">
                </div>
                <span class="h3" :class='$route.path.includes(item.path)?"selected":"active"'>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    data(){
        return{
            routerList:[
                {
                    title:'首頁',
                    path:'/home',
                    active: require('../../assets/images/home.png'),
                    selected:require('../../assets/images/home-selected.png'),
                },
                {
                    title:'所有商品',
                    path:'/products',
                    active:require('../../assets/images/list.png'),
                    selected:require('../../assets/images/list-selected.png'),
                },
                {
                    title:'購物車',
                    path:'/cart',
                    active:require('../../assets/images/cart.png'),
                    selected:require('../../assets/images/cart-selected.png'),
                },
                {
                    title:'會員中心',
                    path:'/users',
                    active:require('../../assets/images/member.png'),
                    selected:require('../../assets/images/member-selected.png'),
                },
            ]
        }
    },
    methods:{
        switchTab(path){
            // 判斷路徑是否同一個
            if(this.$route.path === path) return;
            this.$router.replace(path);
        }
    }
}
</script>

<style scoped>
.tabbar{
    position: fixed;
    bottom:0;
    z-index: 1000;
    width:100%;
    height: 60px;
    background-color: rgb(50, 150, 255);
}
.tabbar ul{
    height: 100%;
    justify-content: space-around;
}
.tabbar-img{
    height: 60%;
    text-align: center;
}
.tabbar  ul li{
    width: 20%;
    cursor: pointer;
}
.selected{
    font-weight: bold;
}
</style>
