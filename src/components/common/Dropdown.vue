<template>
    <div class="dropdown noselect">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <input type="text" id="switch" ref="test" @blur="closeDropdown" inputmode="none">
        <label v-show="isActive" class='h1 text-white material-symbols-outlined'  @click="showDropdown" for="switch">menu</label>
        <label v-show="!isActive" class="h1 text-white material-symbols-outlined" @click="closeDropdown">cancel</label>
        <Navbar class="bg-primary"></Navbar>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default{
    data(){
        return{
            isActive:true,
        }
    },
    methods:{
        showDropdown(){
            this.isActive= false;
        },
        closeDropdown(){
            this.isActive = true;
        }
    },
    components:{
        Navbar
    }
}
</script>

<style scoped>

label{
    margin-right:15px;
    font-size:36px;
}

input{
    width: 0;
    height:0;
    opacity: 0;
}
.dropdown{
    margin-top: -15px;
}
.navbar{
    width: 40%;
    right:0;
    position: fixed;
    z-index: -1;
    margin-top: 10px;
    flex-direction: column;
    transform: translateX(100%);
    transition: all 0.2s;
}
input:focus ~ .navbar {
    transition: all 0.2s;
    transform: translateX(0);
}
</style>