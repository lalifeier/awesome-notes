const io = require('socket.io')(3000)

io.on('connect', client => {
  client.on('message', msg => {
    client.send(msg)
  })
  client.on('disconnect', () => {})
})
