<template>
    <div class="chat flex-row  justify-content-center  align-items-center">
        <div class="chat-content">

            <div class="chat-online-list flex-row">
                <div class="w-full">
                    <p>目前在線：</p>
                    <p v-for="item in onlineList">{{ item }}</p>
                </div>
                <button class="active-btn" @click="isOnlineListActive"> </button>
            </div>

            <div class="flex-row justify-content-around">
                    <p>{{ broadcast }}</p>
                    <p>聊天室人數：{{ onlineList.length }}</p>
            </div>

            <div class="chat-board flex-col" id="chat-board">
                <!-- 每則聊天訊息 -->
                <div v-for="(item,index) in message" :key="index"
                :class="username===item.username 
                        ? 'message flex-row reverse'
                        : 'message flex-row'">

                    <!-- 用戶頭像 -->
                    <img class="message-avatar" :src="item.avatar">

                    <div class="flex-col"
                        :class="username===item.username? 'align-items-end': 'align-items-start'">
                        <!-- 用戶名 -->
                        <div class="message-username h4 flex-row"
                            :class="username===item.username? 'reverse': ''">
                            <p>{{ item.username }} </p>
                            <p v-if="item.isDate">{{ item.date }}</p>
                        </div>
                        <!-- 訊息內容 -->
                        <div class="message-text flex-row flex-wrap h3 cursor-ptr" @click="activeDate(item)" v-if="item.hasURL===true">
                            <div v-for="array in item.messageArray">
                                <!-- 如果是超連結 -->
                                <a v-if="isUrl(array)" v-bind:href="array" target="_blank" style="color:white;">{{ array }}</a>
                                <!-- 如果是空格 -->
                                <div v-else-if="isSpace(array)" class="flex-row">
                                    <p v-for="char in array" >&nbsp;</p>
                                </div>
                                <!-- 其餘文字 -->
                                <p v-else>{{ array }}</p>
                            </div>
                        </div>
                        <!-- 沒有超連結的訊息直接顯示 -->
                        <p class="message-text h3 cursor-ptr" @click="activeDate(item)" v-if="item.hasURL===false">
                            {{item.message}}
                        </p>

                    </div>
                </div>
            </div>
            <!-- 送出訊息的按鈕 -->
            <form @submit.prevent="sendMessage" class="chat-form flex-row">
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
            username:'',        // 用戶名
            onlineList:[],      // 存放線上用戶名稱
            broadcast:'',       // 顯示用戶加入/離開聊天室
            message:[],         // 存放所有訊息
            hasURL:false,       // 是否包含URL
            scrollHeightTemp:0, // 暫存聊天室內容總高度
            activeList:false,    // 判斷在線用戶是否開啟
        }
    },
    methods:{
        // 打開和關閉目前在線人數
        isOnlineListActive(){
            this.activeList = !this.activeList;
            if(this.activeList)
                document.querySelector(".chat-online-list").style.transform =  'translateX(0)';
            else
                document.querySelector(".chat-online-list").style.transform =  'translateX(-150px)';
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
            this.ws = new WebSocket('wss://itdove.onrender.com');
            this.ws.addEventListener('open', () => {});

            // 註冊 'message' 事件
            this.ws.addEventListener('message', (event) => {
                let msgObj = Object.assign({},JSON.parse(event.data))
                // 當用戶離開
                if(msgObj.status===-1){
                    // 將用戶名移除陣列
                    this.onlineList.splice(this.onlineList.indexOf(msgObj.username),1);
                    this.broadcast = msgObj.message;
                }
                // 當用戶進入
                else if(msgObj.status===0){
                    // 如果不存在線上用戶中，再添加進去
                    if(this.onlineList.indexOf(msgObj.username)===-1)
                        this.onlineList.push(msgObj.username);
                    this.broadcast = msgObj.message;
                }
                // 接收到聊天訊息
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
                    this.onlineList = Object.assign([],msgObj.userList)
 
                    let msg =  Object.assign([],msgObj.query);
                    for(let i=msg.length-1 ; i>=0 ; i--){
                        msg[i].hasURL = this.includeUrl(msg[i].message);
                        if(msg[i].hasURL === true)
                            msg[i].messageArray = msg[i].message.split(/(https?:\/\/[^\s]+| +)/g);
                        // 存到message陣列
                        this.message.push(msg[i]);
                    }
                    this.setBottom(true);
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
        setBottom(setToBottom = false){
            // scrollHeight：整個聊天室大小
            // clientHeight：可以看到的範圍
            // scrollTop：往上移到頂的距離
            let offset = 100;
            var chatBoard = document.getElementById('chat-board');
            // 計算出當前滾動條在什麼位置
            let currentScroll = Math.ceil(chatBoard.scrollTop + chatBoard.clientHeight)
            // 當位置在最底下，儲存目前滑到最底的距離
            if( (this.scrollHeightTemp <= currentScroll+offset && 
                this.scrollHeightTemp >= currentScroll-offset) || setToBottom)
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
        // 用戶的設備是手機
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            document.querySelector('.chat-board').style.height = (window.innerHeight - 140) + "px";
            console.log(window.innerHeight)
        }
        this.isOnlineListActive();

    },
    updated(){
        // 讓message setter後，才更新置底
        this.setBottom();
    },
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
    height:80vh;
    overflow-y: auto;
    border: 2px black solid;
    gap: 20px 0px;
}
.message{
    height: auto;
    gap: 0 10px;
}
.message-avatar{
    box-sizing: border-box;
    width:50px;
    height:50px;
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
.reverse{
    flex-direction: row-reverse;
    justify-content: flex-start;
}
/* 線上用戶側欄 */
.chat-online-list{
    left: 0;
    white-space:normal;
    word-break: break-all;
    position: absolute;
    width: 150px;
    height: 45vh;
    box-shadow: 0 0 5px hsla(240, 40%, 15%, 0.6);
    background-color: rgb(224, 224, 224);
    border-radius: 0px 20px 20px 0px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    /* 關閉側欄 */
    transform: translateX(-150px);
    transition: all 0.3s;
}
.chat-online-list div{
    overflow-y: auto;
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
/* 輸入訊息和送出 */
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
        margin-left:6px;
    }
    .chat-board{
        height:68vh;
    }
    .chat-form{
        gap: 0 5px;
        /* 固定在最底下 */
        position: fixed;
        bottom:5px;
        right:10px;
        left:15px;
    }
    .message-avatar{
        width:35px;
        height:35px;
    }
}
</style>