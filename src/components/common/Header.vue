<template>
    <header class="header row space-between-center">
        <a class="logo" href="/"><img src="@/assets/images/logo.png"></a>
        <section class="row header-menu">
            <div class="search row center-center" @click="goSearch">
                <input class="search-input" type="text">
                <img class="search-btn" src="@/assets/images/search.png" @click="goSearchList">
            </div>
            <img class="cursor-ptr" src="@/assets/images/dialogue.png" @click="goChat">
        </section>

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
            alert("歡迎光臨");
        },
        goChat(){
            this.$router.push('/chat');
        }
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

.header-menu{
    flex:1;
    margin-right: 20px;
    height: 50%;
    gap: 10px 10px;
}
.search{
    flex:1;
    background-color: #fff;
    border-radius: 12px;
    padding-left: 10px;
    padding-right: 10px;
}
.search .search-input{
    width: 90%;
    background-color: #fff;
    border: none;
}
.search .search-btn{
    height:50%;
    cursor: pointer;
}
@media (min-width:768px){
    .header-menu{
        flex:none;
    }
}
</style>
