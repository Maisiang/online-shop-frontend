<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">

    <div class="update-avatar flex-col justify-content-between align-items-center">
        <h1 class="h1">更換頭像</h1>
        <div class="cropper-content flex-one flex-row justify-content-center align-items-center">
            <div v-show="status===0" class="upload-image">
                <input type="file" ref="fileInput" multiple="false" @change="chooseFile" accept="image/gif, image/jpeg, image/png"/>
            </div>

            <div v-show="status===1" class="cropper-image">
                <img  :src="source" ref="uploadImage">
            </div>

            <div v-show="status===2" class="dest-image">
                <img :src="destination">
            </div>
        </div>

        <div class="flex-row step-btn justify-content-center">
            <button v-if="status!=0" class="form-submit" @click="prevStep">上一步</button>
            <button v-if="status!=2" class="form-submit" @click="nextStep">下一步</button>
            <button v-if="status===2" class="form-submit" @click="uploadFile">上傳</button>
        </div>
    </div>
</template>

<script>
import { apiUserAvatar } from "@/assets/scripts/api";
import Cropper from "cropperjs"
export default{
    data(){
        return{
            status:0,
            cropper     :{},
            image       :{},
            source      :null,
            destination :null, 
        }
    },
    methods:{
        // 上一步
        prevStep(){
            this.status--;
            if(this.status===0) this.cropper.destroy();
            // 避免頁面resize，因此重新初始化cropper
            else if(this.status===1){
                this.cropper.destroy();
                this.initCropper();
            }
        },
        // 下一步
        nextStep(){
            // 初始化cropper
            if(this.status===0){
                if(this.source===null){
                    alert('請先選擇圖片！');
                    return false;
                }
                this.initCropper();
            }
            // 當選取好範圍，進行裁切
            else if(this.status===1)
                this.getCroppedImage();
            this.status++;
        },
        initCropper(){
            this.image = this.$refs.uploadImage;
            this.cropper = new Cropper(this.image, {
                zoomable: false,
                scalable: false,
                aspectRatio: 1,
            })
        },
        getCroppedImage(){
            const canvas = this.cropper.getCroppedCanvas();
            this.destination = canvas.toDataURL("image/jpeg")
        },
        chooseFile(){
            let file = this.$refs.fileInput.files[0];
            let fileExt = file.name.substr(file.name.lastIndexOf(".") + 1);
            let validImageExt = ["jpg", "jpeg", "png" , "gif"];
            if (validImageExt.indexOf(fileExt.toLowerCase()) < 0) {
                alert("只允許檔案類型為 jpg、jpeg、png、gif");
                this.$refs.fileInput.value = '';
                return false;
            }
            // 將file轉換為dataURL
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.source = e.target.result;
            }
        },
        async uploadFile(){
            if(this.destination!=null){
                // 將dest轉換成blob
                let blobFile = await fetch(this.destination).then(res => res.blob());
                // 將二進制檔案附加到FormData
                let formData = new FormData();
                formData.append("avatar", blobFile);
                // 傳送檔案到伺服器
                apiUserAvatar(formData).then(async (response)=>{
                    alert(response.data.message);
                    location.reload();
                })
            }
        }
    },
    watch: {
        status: function(newValue, oldValue) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    },
}
</script>

<style scoped>

.update-avatar{
    width: 100%;
    min-height: 250px;
    gap: 20px;
}
.upload-image{
    padding-left: 60px;
    width: auto;
}
.cropper-content{
    width:100%;
}
.cropper-image{
    max-width:100%;
    height:auto;
}
.dest-image{
    width: 33%;
    height: auto;
}
.dest-image img{
    width:100%;
}
.form-submit{
    width:30%;
}
.step-btn{
    width:100%;
    gap:15%;
}
</style>