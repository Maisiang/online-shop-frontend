<template>
  <div id="app">
    <Header v-if="this.$route.path.indexOf('/search')===-1"></Header>
    <SearchHeader v-if="this.$route.path.indexOf('/search')>=0"></SearchHeader>
    <router-view class="m-header"></router-view>
    <Footer class="m-tabbar"></Footer>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import SearchHeader from '@/components/search/Header.vue';
import TabBar from '@/components/common/TabBar.vue';
import Footer from '@/components/common/Footer.vue';
export default {
  components:{
    TabBar,
    Header,
    SearchHeader,
    Footer
  },
}
</script>
<style>
.m-tabbar{
  margin-bottom: 60px;
}
.m-header{
  margin-top: 60px;
}
</style>
