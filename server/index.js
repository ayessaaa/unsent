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

const usersInRoom = {};

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("join_room", (data) => {
    const { room, from, pfp } = data;
    if (!usersInRoom[room]) usersInRoom[room] = [];

    if (!usersInRoom[room].some((u) => u.id === socket.id)) {
      usersInRoom[room].push({ id: socket.id, from: from, pfp });
    }
    socket.join(room);

    io.to(data.room).emit("room_users", usersInRoom[room]);
    socket.to(data.room).emit("user_joined", data);
    console.log(usersInRoom[room]);
  });

  socket.on("disconnect", () => {
    let userLeft = null;
    let roomLeft = null;

    for (const room in usersInRoom) {
      const index = usersInRoom[room].findIndex((u) => u.id === socket.id);

      if (index !== -1) {
        userLeft = usersInRoom[room][index];
        roomLeft = room;
        usersInRoom[room].splice(index, 1);

        io.to(room).emit("room_users", usersInRoom[room]);
        break;
      }
    }

    if (userLeft) {
      console.log(
        `user left: ${userLeft.from} (${socket.id}) from room ${roomLeft}`
      );
      io.to(roomLeft).emit("user_left", {
        from: userLeft.from,
        message: "left",
        room: roomLeft,
        type: "logs",
      });
    } else {
      console.log(`User disconnected: ${socket.id}`);
    }
  });

  // socket.on("join_room", (data)=>{
  //   socket.join(data.room);
  //   socket.to(data.room).emit("user_joined", data)
  //   console.log("user joined: ", data.from);
  // })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("message sent: ", data.message);
  });

  socket.on("send_typing_message", (data) => {
    socket.to(data.room).emit("receive_typing_message", data);
    console.log("message sent typing: ", data.message);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
