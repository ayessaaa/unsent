import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () =>{
    if (room !== ""){
      socket.emit("join_room", room);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <>
    <input
        placeholder="room"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>join room</button>
      <input
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>send msg</button>
      <h1>{messageReceived}</h1>
    </>
  );
}

export default App;
