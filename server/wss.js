// WebSocket Server

/**
 * Module dependencies.
 */

const WebSocket = require('ws');
const chat = require('./controller/chat');

/**
 * Variable and Const
 */

let num = 0;
let userList = [];
const wss = new WebSocket.Server({noServer: true})

/**
 * Create WebSocket server.
 */

// 處理 WebSocket 連接
wss.on('connection', async function connection(ws,session){
  // 有新用戶連線進來
  await newConnect(ws,session);

  // 傳送加入訊息給所有人
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      status:0,
      username: ws.username,
      message: ws.username+'進入聊天室！',
    }));
  })

  // 註冊'message'事件
  ws.on('message', (data)=> incoming(ws,data));
  // 註冊'close'事件
  ws.on('close', () => clientClose(ws));
});


// 處理 WebSocket 伺服器錯誤
wss.on('error', function error(error) {
  console.log('WebSocket Server Error： ',error);
});
// 處理 WebSocket 伺服器關閉
wss.on('close', function close() {
  console.log('WebSocket Server關閉！');
});

/**
 * WebSocket Server Function
 */

// 當接收到資料
function incoming(ws,data) {
  if (data instanceof Buffer){
    console.log('接收到二進制資料');
  } 
  else{
    const taipeiDate = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
    let sendData = {
      status  : 1,
      message : data.toString(),
      username: ws.username,
      avatar  : ws.avatar,
      date    : taipeiDate
    }
    chat.addChat(sendData);
    // 發送至每個 client
    wss.clients.forEach(client => {
        client.send(JSON.stringify(sendData));
    })
    console.log(ws.username,'： ',data.toString());
  }
}

// 當用戶離開
function clientClose(ws){
  userList.splice(userList.indexOf(ws.username),1);
  console.log('在線人數：'+userList.length,userList);
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      status:-1,
      username:ws.username,
      message: ws.username+'離開聊天室！',
    }));
  })
}

// 當用戶連線
async function newConnect(ws,session){
  // 判斷用戶身分
  ws.username = '訪客'+ num++;
  ws.avatar = 'unknown.jpg';
  if(session.user!=undefined){
    ws.username = session.user.username;
    ws.avatar = session.user.avatar;
    num--;
  }
  // 新增到線上用戶列表
  if(userList.indexOf(ws.username)===-1)
    userList.push(ws.username);
  console.log('在線人數：'+userList.length,userList);

  let query = await chat.getChat()
  // 傳送身分、在線用戶、聊天紀錄給新用戶
  ws.send(JSON.stringify({
    status: 2,
    username: ws.username,
    userList: userList,
    query
  }));
}

module.exports = wss;