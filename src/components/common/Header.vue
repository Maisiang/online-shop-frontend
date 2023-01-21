<template>
    <header class="header  flex-row  justify-content-between  align-items-center  bg-primary">
        <img src="@/assets/images/logo.png" class="logo  cursor-ptr" @click="goHomePage">
        <Navbar></Navbar>
        <div class="flex-row h-full align-items-center">
            <SearchBar></SearchBar>
            <Dropdown></Dropdown>
        </div>

</header>
</template>

<script>
import Navbar from "./Navbar.vue";
import SearchBar from "./SearchBar.vue";
import Dropdown from "./Dropdown.vue";
export default{
    methods:{
        goHomePage(){
            this.$router.push('/home');
        },
    },
    components:{
        Navbar,
        SearchBar,
        Dropdown
    }
}
</script>

<style scoped>
.header{
    /* 固定在最上方 */
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index:999;
    height: 60px;
}
.logo{
    height: 70%;
}
.dropdown{
    display: none;
}
/* 手機、平板 */
@media (max-width:768px){
    .navbar{
        display: none;
    }
    .dropdown{
        display: block;
    }
}
</style>
