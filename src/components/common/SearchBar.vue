<template>
    <div class="search-bar flex-row align-items-center" @click="goSearch">
        <input class="search-input" type="text" v-model="searchStr">
        <img class="search-btn cursor-ptr" src="@/assets/images/search.png">
    </div>
</template>

<script>
export default{
    data(){
        return{
            searchStr:''
        }
    },
    methods:{
        goSearch(){
            this.$router.push('/search');
        }
    }
}
</script>

<style scoped>
.search-bar{
    background-color: #fff;
    border-radius: 12px;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 20px;
    height: 50%;
}

.search-input{
    width:90%;
    border: none;
    background-color: #fff;
}
.search-btn{
    width:10%;
}
</style>