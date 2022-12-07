<template>
    <div class="category">
        <div class="category-text">
            <h1 class="h1">所有產品類別</h1>
            <p>探索我們針對日常需求而設計的高品質科技產品。</p>
            <p>提供多樣的選擇，給顧客最值得信賴的服務。</p>
        </div>
        <div v-for="(item,index) in categoryList" :key="index">
            <div class="category-img-list">
                <img :src="item.imgUrl">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script scoped>
export default{
    name:'Category',
    data(){
        return{
            categoryList:[
                {name:'耳機' , imgUrl:require('@/assets/images/category/headphones.png')},
                {name:'滑鼠' , imgUrl:require('@/assets/images/category/soundbar.png')},
                {name:'鍵盤' , imgUrl:require('@/assets/images/category/soundcards.png')},
                {name:'泡麵' , imgUrl:require('@/assets/images/category/speakers.png')},
                {name:'伏特加' , imgUrl:require('@/assets/images/category/sxfi.png')},
                {name:'筆電' , imgUrl:require('@/assets/images/category/webcam.png')},
            ],
        }
    },
}
</script>

<style>
.category{
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr 3fr 3fr;
    grid-gap: 10px;

}
.category-text{
    grid-column: span 2;
}

.category-img-list{
    margin: 0 auto;
    text-align: center;
    width: 70%;
    font-weight: bold;
    position: relative;
}
.category-img-list p{
    padding: 5px;
}

.category-img-list:hover{
    background-color: rgba(50, 150, 255,.5);
    transition: .3s .8s;
}
.category-img-list::before,
.category-img-list::after{
    content:'';
    position: absolute;
    width: 0%;
    height: 0%;
    border: rgba(50, 150, 255,1) solid;
    transition: 1s;
}
.category-img-list::before{
    top: 0px;
    left: 0px;
    border-width: 0px 0 0 0px;
}

.category-img-list::after{
    bottom: 0px;
    right: 0px;
    border-width: 0px;
}

.category-img-list:hover::before,
.category-img-list:hover::after{
    width: 98%;
    height: 98%;
}
.category-img-list:hover::before{
    border-width: 3px 0 0 3px;
}
.category-img-list:hover::after{
    border-width: 0 3px 3px 0;
}

@media (min-width:768px){
    .category{
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    .category-text{
        grid-column: span 1;
        grid-row: span 2;
        text-align: start;
        align-self: center;
    }
}
</style>