<template>
  <div class="home noselect">
      <Swiper></Swiper>
      <Intro></Intro>
  </div>
</template>

<script>
import Swiper from '../components/home/Swiper.vue';
import Intro from '../components/home/Intro.vue';
export default {
  name: "HomeView",
  components:{
    Swiper,
    Intro,
  },
};
</script>
