<template>
  <div class="home noselect">
    <Swiper></Swiper>
    <Category></Category>
  </div>
</template>

<script>
import Swiper from '../components/home/Swiper.vue';
import Category from '../components/home/Category.vue';

export default {
  name: "HomeView",
  components:{
    Swiper,
    Category,
  },
};
</script>