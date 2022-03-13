const express = require('express');
const app = express();

const http = require('http');

const cors = require('cors');

const { Server } = require('socket.io');


app.use(cors());

const server = http.createServer(app);

// making a variable and giving it an instance of Server
const io = new Server(server , {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET' , 'POST']
  }
});

//when someone one website this triggers.
io.on('connection', (socket) => {
  console.log('User connected' , socket.id);

  socket.on('join_room' , (data) => {
    socket.join(data);
    console.log(`User with Id ${socket.id} have joined room ${data}`);
  })

  socket.on('send_message' , (data) => {
    // .to is used to emit data to a specific room;
    // console.log(data);
    socket.to(data.room).emit('receive_message',data);
  })

  socket.on('disconnect' , () => {
    console.log('User disconnected', socket.id);
  });
});


const PORT = 3001;
server.listen(PORT , () => {
  console.log('Server is running!');
});