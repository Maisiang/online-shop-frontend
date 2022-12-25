<template>
    <header class="header row space-between-center">
        <a class="back"><img src="@/assets/images/back.png" @click="goBack"></a>
        <form class="row search-form" action="" onsubmit="return false"
        @keyup.enter="goSearchList">
            <input type="text" class="search-input" placeholder="輸入你想找的商品..." v-model="searchVal">
        </form>
        <button class="h2 search-btn noselect" @click="goSearchList">搜尋</button>
    </header>
</template>

<script>

export default{
    data(){
        return{
            searchVal:'',
            searchArr:[],
        }
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        goSearchList()
        {
            // 搜尋為空 用trim()空格更嚴謹
            if(!this.searchVal) return;
            // 判斷local storage有沒有之前的搜索紀錄
            if(!localStorage.getItem('searchList'))
                localStorage.setItem('searchList','[]');
            else
                this.searchArr = JSON.parse(localStorage.getItem('searchList'));

            // 增加資料 存放在記憶體
            this.searchArr.unshift(this.searchVal);
            // 去掉重複項
            let newArr = new Set(this.searchArr);
            // 存放到 local storage (set轉array)
            localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)));
            // 如果是重複的搜索
            if(this.$route.query.key === this.searchVal) return;
            // 路由到搜索頁
            this.$router.push({
                name:'search-list',
                query:{
                    key:this.searchVal
                }
            });
            this.searchArr.length = 0;
        },
    },
}
</script>

<style scoped>
.header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    height: 60px;
    background-color: rgb(50, 150, 255);
    align-items: center;
}
.back{
    height: 50%;
    cursor: pointer;
    margin-left: 30px;
}
.search-form{
    width: 50%;
    height: 60%;
}
.search-input{
    width: 100%;
    border-radius: 12px;
    padding: 10px;
    border: 3px rgb(20, 122, 189) solid;
}
.search-btn{
    background: none;
    padding: 5px;
    border: 2px white solid;
    color: white;
    cursor: pointer;
    margin-right: 30px;
}
.search-btn:hover{
    background-color: white;
    color: rgb(50, 150, 255);
}
@media (min-width:768px){
    .search-form{
        width: 40%;
    }
}
</style>
