<template>
    <div class="profile">
        <h1 class="h1 text-align-center">個人檔案</h1>
        <div class="user-table row center-center">
            <div class="user-field col gap-row">
            <h2>用戶名</h2>
            <h2>電子郵件</h2>
            </div>
            <div class="col gap-row">
                <h2>{{userInfo.username}}</h2>
                <h2>{{userInfo.email}}</h2>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    props:['userInfo'],
}
</script>

<style scoped>
.user-table{
    margin-top: 20px;
    gap: 20px 30px;
}
.gap-row{
    gap: 20px 0;
}
.user-field{
    width: 150px;
    color:rgb(82, 82, 82)
}

</style>