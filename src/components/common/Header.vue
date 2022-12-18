<template>
    <header class="header row space-between-center">
        <a class="logo" href="/"><img src="@/assets/logo.png"></a>

        <div class="search row center-center" @click="goSearch">
            <input class="search-input" type="text">
            <img class="search-btn" src="@/assets/images/search.png" @click="goSearchList">
        </div>
</header>
</template>

<script>

export default{
    data(){
        return{}
    },
    methods:{
        goSearch(){
            this.$router.push('/search');
        },
        goSearchList(){
            alert("Search");
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
    z-index:999;
    height: 60px;
    background-color: rgb(50, 150, 255);
}
.logo{
    height: 80%;
}

.search{
    background-color: #fff;
    height: 50%;
    border-radius: 12px;
    margin-right: 20px;
}
.search .search-input{
    margin-left: 10px;
    background-color: #fff;
    border: none;
}
.search .search-btn{
    margin-right: 10px;
    height:50%;
    cursor: pointer;
}
@media (min-width:768px){
    /* 圖片會跑掉 */

}
</style>
