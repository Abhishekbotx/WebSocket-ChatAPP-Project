var socket=io();
let btn=document.getElementById('btn');
let inputMessage=document.getElementById('newMsg');
let messageList=document.getElementById('msgList');

btn.onclick=function exec(){
    socket.emit('msg_send',{
        msg:inputMessage.value
    })
}


socket.on('msg_rcvd',(data)=>{
    let listMsg=document.createElement('li');
    listMsg.innerText=data;
    messageList.appendChild(listMsg)
})