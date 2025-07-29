import Chatbox from "../components/Chatbox";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import RoomID from "../components/RoomID";

const socket = io.connect("http://localhost:3000");

function PrivateRoom() {
  const { roomID } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theirTypingMessage, setTheirTypingMessage] = useState("");

  useEffect(() => {
    socket.emit("join_room", roomID);

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          from: "user",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      console.log("message received: ", data.message);
    };

    const handleReceiveTypingMessage = (data) => {
      setTheirTypingMessage(data.message);
      console.log("message received typing: ", data.message);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("receive_typing_message", handleReceiveTypingMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("receive_typing_message", handleReceiveTypingMessage);
    };
  }, [roomID]);

  const handleSendMessage = () => {
    socket.emit("send_message", { message, room: roomID });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, from: "me", time: new Date().toLocaleTimeString() },
    ]);
    setMessage("");
    socket.emit("send_typing_message", {
      message: "",
      room: roomID,
    });
  };

  const handleTyping = (typingMessage) => {
    socket.emit("send_typing_message", {
      message: typingMessage,
      room: roomID,
    });
  };

  return (
    <>
      <Clouds />
      <div className="pt-10">
        <Logo />
      </div>
      <RoomID/>
      <Chatbox
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        messages={messages}
        handleTyping={handleTyping}
        theirTypingMessage={theirTypingMessage}
      />
    </>
  );
}

export default PrivateRoom;
