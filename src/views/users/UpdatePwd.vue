<template>
    <div class="text-align-center">
        <h1 class="h1">更改密碼</h1>
        <form class="form-update-password flex-col align-items-center" @submit.prevent="updatePwd">
            <input type="password" placeholder="請輸入舊密碼..."      v-model="passwordList.oldPwd"     required />
            <input type="password" placeholder="請輸入新密碼..."      v-model="passwordList.newPwd"     required />
            <input type="password" placeholder="請再次輸入新密碼..."  v-model="passwordList.reNewPwd"   required />
            <input type="submit" value="更改密碼" class="form-submit">
        </form>
    </div>
</template>

<script>
import { apiUserPassword } from '@/assets/scripts/api';
export default{
    data(){
        return{
            passwordList:{
                oldPwd:'',
                newPwd:'',
                reNewPwd:''
            }
        }
    },
    methods:{
        // 更新密碼
        updatePwd(){
            if(this.passwordList.newPwd != this.passwordList.reNewPwd){
                alert('兩次新密碼不一致...')
                return false;
            }
            apiUserPassword({
                passwordList: this.passwordList
            }).then((response)=>{
                alert(response.data.message);
                if(response.data.isSuccess)
                    location.reload();
            })
        }
    }
}
</script>

<style scoped>
.form-update-password{
    margin: 10px auto 0px;
    width: 300px;
    gap: 15px 0;
}
.form-update-password input[type="password"]{
    width:100%;
    height: 40px;
}
</style>