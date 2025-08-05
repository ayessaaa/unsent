import { useEffect, useState } from "react";
import BgElements from "../components/BgElements";
import Button from "../components/Button";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import Chatbox from "../components/Chatbox";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function GlobalChat() {
  const [username, setUsername] = useState("");
  const [currentPfpIndex, setCurrentPfpIndex] = useState(1);
  const [hasPfp, setHasPfp] = useState(false);

  const roomID = "global";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theirTypingMessages, setTheirTypingMessages] = useState([]);

  const [mode, setMode] = useState("global");

  useEffect(() => {
    socket.emit("join_room", roomID);

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          from: data.from,
          pfp: data.pfp,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      console.log("message received: ", data.message);
    };

    const handleReceiveTypingMessage = (data) => {
      setTheirTypingMessages((prevMessages) => {
        const idx = prevMessages.findIndex((msg) => msg.from === data.from);
        if (idx !== -1) {
          // Replace the existing user's typing message
          const updated = [...prevMessages];
          updated[idx] = data;
          return updated;
        } else {
          // Append new user's typing message
          return [...prevMessages, data];
        }
      });
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
    const msg = {
      message,
      from: username,
      pfp: "/imgs/pfp/frog.PNG",
      room: roomID,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage("");

    socket.emit("send_typing_message", {
      message: "",
      from: username,
      pfp: "/imgs/pfp/frog.PNG",
      room: roomID,
    });
  };

  const handleTyping = (typingMessage) => {
    socket.emit("send_typing_message", {
      message: typingMessage,
      from: username,
      pfp: "/imgs/pfp/frog.PNG",
      room: roomID,
    });
  };

  function handleCreatePfp(e) {
    e.preventDefault();
    setHasPfp(true);
  }

  return (
    <div>
      <Clouds />
      <BgElements />
      <div className="pt-8">
        <Logo />
      </div>
      <p className="text-center text-white text-3xl tracking-wide mt-20">
        global chat
      </p>
      {hasPfp ? (
        <Chatbox
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          messages={messages}
          handleTyping={handleTyping}
          theirTypingMessages={theirTypingMessages}
          username={username}
        />
      ) : (
        <div>
          <Profile
            username={username}
            setUsername={setUsername}
            currentPfpIndex={currentPfpIndex}
            setCurrentPfpIndex={setCurrentPfpIndex}
            handleCreatePfp={handleCreatePfp}
          />
        </div>
      )}
    </div>
  );
}

export default GlobalChat;
