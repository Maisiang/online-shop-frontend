<template>
    <div class="footer flex-col  justify-content-center  align-items-center">
        <p v-if="this.$route.path.indexOf('/home')>=0">本網頁為個人學習使用，無任何商業用途！</p>
    </div>
</template>
<script>

</script>
<style scoped>
.footer p{
    margin-top:40px;
    margin-bottom:40px;
}
</style>