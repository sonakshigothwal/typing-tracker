const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

// Store typed message history in memory
const messageHistory = [];

// Real-time socket events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send message history when client asks
  socket.on('getHistory', () => {
    socket.emit('messageHistory', messageHistory);
  });

  // When someone is typing
  socket.on('typing', (data) => {
    messageHistory.push(data); // Save it in memory
    socket.broadcast.emit('receiveTyping', data);
  });

  // When someone stops typing
  socket.on('stopTyping', () => {
    socket.broadcast.emit('userStoppedTyping');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
