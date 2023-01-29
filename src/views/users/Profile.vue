<template>
    <div class="profile flex-col align-items-center">
        <div>
            <h1 class="h1 title text-align-center">個人檔案</h1>
            <div class="flex-row  justify-content-center  gap-row">
                <div class="user-field flex-col gap-row">
                    <h2>用戶名</h2>
                    <h2>電子郵件</h2>
                    <h2>註冊時間</h2>
                </div>
                <div class="flex-col gap-row">
                    <h2>{{ userInfo.username  }}</h2>
                    <h2>{{ userInfo.email }}</h2>
                    <h2>{{ userInfo.registrationDate }}</h2>
                </div>
            </div>
        </div>
        <UpdateAvatar></UpdateAvatar>
    </div>
</template>

<script>
import UpdateAvatar from '@/components/users/UpdateAvatar.vue';
export default{
    props:['userInfo'],
    components:{
        UpdateAvatar
    },
}
</script>

<style scoped>
.profile{
    gap: 40px;
}

.title{
    margin-bottom: 20px;
}
.gap-row{
    gap: 20px 30px;
}
.user-field{
    width: auto;
    color:rgb(80, 80, 80)
}
/* 手機、平板 */
@media (max-width:768px){
    .profile{
        margin-bottom: 50px;
    }
}
</style>