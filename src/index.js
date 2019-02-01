import express from 'express'
import http from 'http'
import socketIO from 'socket.io'

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

io.on('connection', (socket) => {
  console.log('user connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('send message', (message) => {

    console.log(`user sent ${message}`)

    let returnMessage

    switch(String(message)){
      case 'hello':
        returnMessage = 'Hello Person!'
        break
      case 'bye':
        returnMessage = 'Bye Bye Person!'
        break
      default:
        returnMessage = message
        break
    }

    console.log(`system sent ${returnMessage}`)

    io.emit('send message', returnMessage)

  })

})

server.listen(3000, () => {
  console.log('listening on *:3000')
})