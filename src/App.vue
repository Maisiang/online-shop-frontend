<template>
  <div id="app">
    <Header v-if="this.$route.path.indexOf('/search')===-1"></Header>
    <SearchHeader v-if="this.$route.path.indexOf('/search')>=0"></SearchHeader>
    <router-view class="m-tabbar m-header h-full"></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import SearchHeader from '@/components/search/Header.vue';
import TabBar from '@/components/common/TabBar.vue';

export default {
  components:{
    TabBar,
    Header,
    SearchHeader
  },
}
</script>
<style>
.m-tabbar{
  margin-bottom: 100px;
}
.m-header{
  margin-top: 60px;
}
</style>