var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.get('/', function (req, res) {
  res.send('hello')
});

io.on('connection', function (socket) {

  // 聊天功能
  socket.on('getMessage', data => {
    socket.broadcast.emit('setMessage', { // broadcast给所有人发送消息
      name: data.name,
      message: data.message
    })
  })
});


server.listen(8089)
console.log('server start')