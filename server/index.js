const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket)=>{
    console.log("user connected: ", socket.id);

    socket.on("join_room", (data)=>{
      socket.join(data);
    })

    socket.on("send_message", (data)=>{
      socket.to(data.room).emit("receive_message", data)
      console.log("message sent: ", data.message);
    })
}) 

server.listen(3000, ()=>{
    console.log('listening on *:3000');
})
