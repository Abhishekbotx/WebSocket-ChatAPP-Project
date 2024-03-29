const express=require('express')
const http = require('http');
const socketio = require('socket.io');
const Chat=require('./model/Chat')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connect=require('./config/database')



io.on('connection', (socket) => {
    console.log("new user connected:",socket.id)
    
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid);
        socket.join(data.roomid);
    });

    socket.on('msg_send', async(data) => {
        const chat=await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        })
        console.log(data);
        io.to(data.roomid).emit('msg_rcvd', data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.to(data.roomid).emit('someonetyping',{usermame:data.userName})
    })
});

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));



app.get('/chat/:roomid', async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user');//selecting the content and the user
    console.log(chats);
    res.render('index', {
        name: 'Abhishek',
        id: req.params.roomid,
        chats: chats
    });
});


app.use('/', express.static(__dirname + '/public'));

server.listen(3001, async() => {
    console.log('Server started');
    await connect()
});



