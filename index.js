const express=require('express')
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);



io.on('connection', (socket) => {
    console.log("new user connected:",socket.id)
    
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid);
        socket.join(data.roomid);
    });

    socket.on('msg_send', (data) => {
        console.log(data);
        io.to(data.roomid).emit('msg_rcvd', data);
    });
});

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', (req, res) => {
    res.render('index', {
        name: 'Sanket',
        id: req.params.roomid
    });
});


app.use('/', express.static(__dirname + '/public'));

server.listen(3001, () => {
    console.log('Server started');
});



