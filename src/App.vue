<template>
  <div id="app">
    <Header v-if="this.$route.path.indexOf('/search')===-1"></Header>
    <SearchHeader v-if="this.$route.path.indexOf('/search')>=0"></SearchHeader>
    <router-view class="m-header"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import SearchHeader from '@/components/search/Header.vue'
import Footer from '@/components/common/Footer.vue';
export default {
  components:{
    Header,
    SearchHeader,
    Footer
  },
}
</script>
<style>
.m-header{
  margin-top: 60px;
}
</style>
