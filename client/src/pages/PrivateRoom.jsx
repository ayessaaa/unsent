import Chatbox from "../components/Chatbox";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function PrivateRoom() {
  const { roomID } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [theirMessage, setTheirMessage] = useState("");

  useEffect(() => {
    socket.emit("join_room", roomID);

    const handleReceiveMessage = (data) => {
      setTheirMessage(data.message);
      setMessages((prevMessages) => [...prevMessages, { message: data.message, from: "user" }]);
      console.log("message received: ", data.message);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [roomID]);

  const handleSendMessage = () => {
    socket.emit("send_message", { message, room: roomID });
    setMessages((prevMessages) => [...prevMessages, { message, from: "me" }]);
    setMessage("");
  };

  return (
    <>
      <Clouds />
      <div className="pt-10">
        <Logo />
      </div>
      <Chatbox
        message={message}
        setMessage={setMessage}
        theirMessage={theirMessage}
        handleSendMessage={handleSendMessage}
        messages={messages}
      />
    </>
  );
}

export default PrivateRoom;
