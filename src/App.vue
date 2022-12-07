<template>
  <div id="app">
    <Header></Header>
    <router-view class="m-tabbar m-header h-full"></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import TabBar from '@/components/common/TabBar.vue';

export default {
  components:{
    TabBar,
    Header
  }
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