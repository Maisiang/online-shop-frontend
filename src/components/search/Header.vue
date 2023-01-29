<template>
    <header class="header flex-row justify-content-between align-items-center bg-primary">
        <a class="back cursor-ptr"><img src="@/assets/images/back.png" @click="goBack"></a>
        <form class="row search-form" action="" onsubmit="return false"
        @keyup.enter="goSearchList">
            <input type="text" class="search-input" placeholder="輸入你想找的商品..." v-model="searchStr" ref="searchInput">
        </form>
        <button class="h2 search-btn cursor-ptr noselect" @click="goSearchList">搜尋</button>
    </header>
</template>

<script>

export default{
    data(){
        return{
            searchStr:'',
            searchArray:[],
        }
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        goSearchList()
        {
            // 搜尋為空 用trim()空格更嚴謹
            if(!this.searchStr) return;
            // 判斷local storage有沒有之前的搜索紀錄
            if(!localStorage.getItem('searchList'))
                localStorage.setItem('searchList','[]');
            else
                this.searchArray = JSON.parse(localStorage.getItem('searchList'));
            // 增加資料存放在記憶體
            this.searchArray.unshift(this.searchStr);
            // 利用Set去掉重複項
            let searchSet = new Set(this.searchArray);
            // 存放到 local storage (set轉array)
            localStorage.setItem('searchList',JSON.stringify(Array.from(searchSet)));
            // 如果是重複的搜索
            if(this.$route.query.key === this.searchStr) return;
            // 路由到搜索頁
            this.$router.push({
                name:'search-list',
                query:{
                    key:this.searchStr
                }
            });
            this.searchArray.length = 0;
        },
    },
    mounted(){
        this.$refs.searchInput.focus();
    }
}
</script>

<style scoped>
.header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    height: 60px;
}
.back{
    height: 50%;
    margin-left: 25px;
}
.search-form{
    box-sizing: border-box;
    width: 40%;
    height: 60%;
}
.search-input{
    box-sizing: border-box;
    width: 100%;
    border-radius: 12px;
    padding: 8px;
    border: 3px rgb(20, 120, 190) solid;
}
.search-btn{
    background: none;
    border: 2px white solid;
    color: white;
    margin-right: 25px;
}
.search-btn:hover{
    background-color: white;
    color: rgb(50, 150, 255);
}
/* 手機、平板 */
@media (max-width:768px){
    .search-form{
        width: 50%;
    }

}
</style>
