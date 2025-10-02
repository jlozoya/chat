const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
const PORT = 4000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://44.202.126.211",
  "http://177.226.99.136",
  "https://chat.lozoya.org"
];

const socketIO = require('socket.io')(http, {
  path: '/socket.io',
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.set('trust proxy', true);
let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", data => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ));

  socket.on("newUser", data => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"});
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
