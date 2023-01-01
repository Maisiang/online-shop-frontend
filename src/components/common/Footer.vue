<template>
    <div class="footer col center-center">
        <p  v-if="this.$route.path.indexOf('/home')>=0">本網頁為個人學習使用，無任何商業用途！</p>
    </div>
</template>
<script>

</script>
<style scoped>
.footer{
    /*margin-top:40px;*/
    height: 100px;
}
</style>