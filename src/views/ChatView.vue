<template>
    <div class="chat">
        <h3 class="h3" v-for="(item,index) in message" :key="index">
            {{ item }}
        </h3>

        <input type="text" ref="sayInput">
        <button @click="sendMessage">發送</button>
    </div>
</template>

<script>
export default{
    name: "HomeView",
    data(){
        return{
            ws:null,
            message:[]
        }
    },
    methods:{
        // 連接WebSocket
        connection(){
            //初始化WebSocket客戶端
            this.ws = new WebSocket('ws://itdove.ddns.net:3000');
            // 註冊 'open' 事件
            this.ws.addEventListener('open', () => {
                this.ws.send('Connection')
            });
            // 註冊 'message' 事件
            this.ws.addEventListener('message', (event) => {
                this.message.push(event.data);
            });
        },
        // 關閉WebSocket
        closeConnection(){
            // 1: 連接開啟，WebServer準備接收和傳送資料
            if(this.ws.readyState === 1){
                alert('關閉WebSocket連接')
                this.ws.close();
            }
        },
        sendMessage(){
            // 二進制
            //ws.binaryType = 'arraybuffer';
            // 發送文字
            this.ws.binaryType = 'blob';
            this.ws.send(this.$refs.sayInput.value);
            this.$refs.sayInput.value = '';
        }
    },
    // 當離開此路由
    beforeRouteLeave(to, from, next) {
        this.closeConnection();
        next();
    },
    // 當組件掛載到DOM、所有渲染工作都完成時
    mounted(){
        this.connection();
    }
}
</script>

<style scoped>

</style>