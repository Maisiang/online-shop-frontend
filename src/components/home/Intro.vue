<template>
    <div class="Intro">
        <div class="Intro-text">
            <h1 class="h1">所有產品類別</h1>
            <p>探索我們為日常需求而設計的高科技產品！</p>
            <p>提供多樣的選擇，給顧客最值得信賴的服務</p>
        </div>
        <div v-for="item in categoryList">
            <div class="Intro-img-list text-align-center">
                <img :src="item.imgUrl">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script scoped>
export default{
    data(){
        return{
            categoryList:[
                {name:'耳機' , imgUrl:require('@/assets/images/category/headphones.jpg')},
                {name:'滑鼠' , imgUrl:require('@/assets/images/category/mouse.jpg')},
                {name:'鍵盤' , imgUrl:require('@/assets/images/category/keyboard.jpg')},
                {name:'喇叭' , imgUrl:require('@/assets/images/category/speakers.jpg')},
                {name:'路由器' , imgUrl:require('@/assets/images/category/router.jpg')},
                {name:'筆電' , imgUrl:require('@/assets/images/category/laptop.jpg')},
            ],
        }
    },
}
</script>

<style>
.Intro{
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 2fr;
}
.Intro-text{
    grid-column: span 2;
    margin-bottom: 10px;
}

.Intro-img-list{
    margin: 0 auto;
    width: 70%;
    font-weight: bold;
    position: relative;
}
.Intro-img-list p{
    padding: 5px;
}

.Intro-img-list:hover{
    background-color: rgba(50, 150, 255,.5);
    transition: .3s .8s;
}
.Intro-img-list::before,
.Intro-img-list::after{
    content:'';
    position: absolute;
    width: 0%;
    height: 0%;
    border: rgba(50, 150, 255,1) solid;
    transition: 1s;
}
.Intro-img-list::before{
    top: 0px;
    left: 0px;
    border-width: 0px 0 0 0px;
}

.Intro-img-list::after{
    bottom: 0px;
    right: 0px;
    border-width: 0px;
}

.Intro-img-list:hover::before,
.Intro-img-list:hover::after{
    width: 98%;
    height: 98%;
}
.Intro-img-list:hover::before{
    border-width: 3px 0 0 3px;
}
.Intro-img-list:hover::after{
    border-width: 0 3px 3px 0;
}
/* 電腦 */
@media (min-width:768px){
    .Intro{
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 10px;
    }
    .Intro-text{
        grid-column: span 1;
        grid-row: span 2;
        text-align: start;
        align-self: center;
    }
}
</style>