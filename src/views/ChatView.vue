<template>
    <div class="chat row center-center">
        <div class="chat-content">
            <div :class="activeList===false
                ?'active-online-list chat-online-list row'
                :'chat-online-list row'">
                <div class="w-full">
                    <p>目前在線：</p>
                    <p v-for="item in onlineList">{{ item }}</p>
                </div>
                <button class="active-btn" @click="isOnlineListOpen"> </button>
            </div>
            <div class="row space-around-center">
                    <p>{{ broadcast.message }}</p>
                    <p>聊天室人數：{{ onlineList.length }}</p>
            </div>
            <div class="chat-board col" id="chat-board">
                <div v-for="(item,index) in message" :key="index"
                :class="username===item.username 
                        ? 'message row reverse'
                        : 'message row'">

                    <img class="message-avatar" :src="require('@/assets/images/photo/'+item.avatar)">

                    <div :class="username===item.username 
                                ? 'col align-end' 
                                : 'col align-start'">

                        <div :class="username===item.username 
                                    ? 'h4 row message-username reverse' 
                                    : 'h4 row message-username'">
                            <p>{{ item.username }} </p>
                            <p v-if="item.isDate">{{ item.date }}</p>
                        </div>

                        <div class="message-text row flex-wrap h3 cursor-ptr" @click="activeDate(item)"
                            v-if="item.hasURL===true">
                            <div v-for="array in item.messageArray" class="test">
                                <a v-if="isUrl(array)" v-bind:href="array" target="_blank" style="color:white;">{{ array }}</a>
                                <div v-else-if="isSpace(array)" class="row">
                                    <p v-for="char in array" >&nbsp;</p>
                                </div>
                                <p v-else>{{ array }}</p>
                            </div>
                        </div>
                        <p class="h3 message-text cursor-ptr" @click="activeDate(item)"
                            v-if="item.hasURL===false">{{item.message}}</p>

                    </div>
                </div>
            </div>
            <form @submit.prevent="sendMessage" class="chat-form row">
                <input type="text" ref="sayInput" maxlength="300" placeholder="輸入訊息...">
                <button>送出</button>
            </form>

        </div>
    </div>
</template>

<script>
export default{
    name: "ChatView",
    data(){
        return{
            ws:null,        
            username:'',    // 用戶名
            onlineList:[],  // 存放線上用戶名稱
            broadcast:{},   // 顯示用戶加入/離開聊天室
            message:[],     // 存放所有訊息
            hasURL:false,   // 是否包含URL
            scrollHeightTemp:0,          
            activeList:false,
        }
    },
    methods:{
        isOnlineListOpen(){
            this.activeList = !this.activeList;
        },
        // 判斷是否為空格
        isSpace(str){
            if(str[0]===' ')  return true;
            else return false;
        },
        // 判斷是否為URL
        isUrl(str) {
            return /^https?:\/\/[^\s]+$/.test(str);
        },
        // 判斷是否包含URL
        includeUrl(str){
            return /https?:\/\/[^\s]+/.test(str);
        },
        // 連接WebSocket
        connection(){
            //初始化WebSocket客戶端、註冊 'open' 事件
            this.ws = new WebSocket('ws://itdove.ddns.net:3000');
            this.ws.addEventListener('open', () => {});

            // 註冊 'message' 事件
            this.ws.addEventListener('message', (event) => {
                let msgObj = Object.assign({},JSON.parse(event.data))
                // 當用戶離開
                if(msgObj.status===-1){
                    // 將用戶名移除陣列
                    this.onlineList.splice(this.onlineList.indexOf(msgObj.username),1);
                    this.broadcast = Object.assign({},msgObj);
                }
                // 當用戶進入
                else if(msgObj.status===0){
                    // 如果不存在線上用戶中，再添加進去
                    if(this.onlineList.indexOf(msgObj.username)===-1){
                        this.onlineList.push(msgObj.username);
                        this.broadcast = Object.assign({},msgObj);
                    }
                }
                // 當用戶傳送訊息
                else if(msgObj.status===1){
                    // 預設將訊息時間顯示關閉
                    msgObj.isDate = false;
                    // 判斷是否存在超連結
                    msgObj.hasURL = this.includeUrl(msgObj.message);
                    // 將超連結、空格、其他字元切開
                    if(msgObj.hasURL === true)
                        msgObj.messageArray = msgObj.message.split(/(https?:\/\/[^\s]+| +)/g);
                    // 存到message陣列
                    this.message.push(msgObj);
                }
                // 取得自己用戶名
                else if(msgObj.status===2){
                    this.username = msgObj.username;
                }
            });
        },
        // 發送訊息到伺服器
        sendMessage(){
            // 不為空則送出訊息
            if(this.$refs.sayInput.value != ''){
                this.ws.binaryType = 'blob';
                this.ws.send(this.$refs.sayInput.value);
            }
            // 清空輸入並取得焦點
            this.$refs.sayInput.value = '';
            this.$refs.sayInput.focus();
        },
        // 關閉WebSocket
        closeConnection(){
            // 1: 連接開啟，WebServer準備接收和傳送資料
            if(this.ws.readyState === 1){
                this.ws.close();
            }
        },
        // 判斷用戶聊天框是否置底
        setBottom(){
            // scrollHeight：整個聊天室大小
            // clientHeight：可以看到的範圍
            // scrollTop：往上移到頂的距離
            let offset = 100;
            var chatBoard = document.getElementById('chat-board');
            // 計算出當前滾動條在什麼位置
            let currentScroll = Math.ceil(chatBoard.scrollTop + chatBoard.clientHeight)
            // 當位置在最底下，儲存目前滑到最底的距離
            if( this.scrollHeightTemp <= currentScroll+offset && 
                this.scrollHeightTemp >= currentScroll-offset)
                chatBoard.scrollTop = Math.ceil(chatBoard.scrollHeight - chatBoard.clientHeight);
            // 暫存scrollHeight，給下一次呼叫函式使用，因為scrollHeight會更新
            this.scrollHeightTemp = chatBoard.scrollHeight;
        },
        // 顯示/關閉訊息日期
        activeDate(item){
            item.isDate=!item.isDate;
        },
    },
    // 當離開此路由
    beforeRouteLeave(to, from, next) {
        this.closeConnection();
        next();
    },
    // 當組件掛載到DOM、所有渲染工作都完成時
    mounted(){
        this.connection();
    },
    updated(){
        // 讓message setter後，才更新置底
        this.setBottom();
    }
}
</script>

<style scoped>

.chat-content{
    width: 70%;
    padding: 10px;
}
.chat-board{
    box-sizing: border-box;
    padding:5px;
    height: 70vh;
    overflow-y: auto;
    border: 2px black solid;
    gap: 20px 0px;
}
.message{
    height: auto;
    gap: 0 10px;
}
.message-avatar{
    height:30px;
    border-radius: 50%;
    border: 2px rgb(50, 150, 255) solid;
    align-self: flex-end;
}
.message-username{
    gap: 0 10px;
}
.message-text{
    width: auto;
    border-radius: 12px;
    padding: 8px;
    background-color: rgb(50, 150, 255);
    color:white;
    line-height: 20px;
    /* 中英文換行 */
    word-break:break-all; /* break-word */
    white-space:pre-wrap;
}
.message-text:hover{
    background-color: gray;
    color:black;
}
.chat-online-list{
    left: 0;
    white-space:normal;
    word-break: break-all;
    position: absolute;
    width: 200px;
    height: 65vh;
    box-shadow: 0 0 5px hsla(240, 40%, 15%, 0.6);
    background-color: rgb(224, 224, 224);
    border-radius: 0px 20px 20px 0px;
    padding: 10px;
    box-sizing: border-box;
    /* 關閉側欄 */
    transform: translateX(-200px);
    transition: all 0.3s;
}
.active-online-list{
    /* 開啟側欄 */
    transform: translateX(0);
}
.active-btn{
    width:25px;
    margin-right: -50px;
    align-self: center;
    text-align: end;
    background-color:rgb(224, 224, 224);
    border: 0px;
    height: 80px;
    border-radius: 0px 5px 5px 0px;
    border:2px rgb(132, 132, 132) solid;
    cursor: pointer;

}
.reverse{
    flex-direction: row-reverse;
    justify-content: flex-start;
}
.chat-form{
    padding-top: 5px;
    gap: 0 10px;
}
.chat-form input[type="submit"],
.chat-form input[type="text"]{
    box-sizing: border-box;
    height:40px;
}
.chat-form input[type="text"]{
    flex:1;
}
.chat-form input[type="submit"]{
    width: 80px;
}
/* 手機、平板 */
@media (max-width:768px){
    .chat-content{
        width: 100%;
    }
    .chat-board{
        margin-left:6px;
        height: 55vh;
        overflow-y: auto;
        overflow-wrap: break-word;
    } 
    .chat-form{
        gap: 0 5px;
    }
    .chat-form input[type="submit"],
    .chat-form input[type="text"]{
        height: 30px;
    }
}
</style>