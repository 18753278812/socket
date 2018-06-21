var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.get('/', function (req, res) {
  res.send('hello')
});

io.on('connection', function (socket) {
  // 加入聊天室
  socket.on('join', data => {
    socket.broadcast.emit('join', { // broadcast给所有人发送消息
      name: data.name,
      message: '加入聊天室'
    })
  })
  // 聊天功能
  socket.on('getMessage', data => {
    socket.broadcast.emit('setMessage', { // broadcast给所有人发送消息
      name: data.name,
      message: data.message
    })
  })

  socket.on('disconn', data => {
    socket.broadcast.emit('join', { // broadcast给所有人发送消息
      name: data.name,
      message: '退出聊天室'
    })
    socket.disconnect(true)
  })
});


server.listen(8089)
console.log('server start')