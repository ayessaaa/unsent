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
  const pfpArray = [
    "/imgs/pfp/bear1.PNG",
    "/imgs/pfp/frog1.PNG",
    "/imgs/pfp/dino1.PNG",
    "/imgs/pfp/bird1.PNG",
  ];

  const [username, setUsername] = useState("");
  const [pfpIndex, setPfpIndex] = useState(1);
  const [hasPfp, setHasPfp] = useState(false);

  const roomID = "global";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theirTypingMessages, setTheirTypingMessages] = useState([]);

  const [mode, setMode] = useState("global");

  useEffect(() => {
    socket.emit("join_room", roomID);

    const handleUserJoined = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("joined");
    };

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

    socket.on("user_joined", handleUserJoined);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("receive_typing_message", handleReceiveTypingMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("receive_typing_message", handleReceiveTypingMessage);
      socket.off("user_joined", handleUserJoined);
    };
  }, [roomID]);

  const handleSendMessage = () => {
    const msg = {
      message,
      from: username,
      pfp: pfpIndex,
      room: roomID,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage("");

    socket.emit("send_typing_message", {
      message: "",
      from: username,
      pfp: pfpIndex,
      room: roomID,
    });
  };

  const handleTyping = (typingMessage) => {
    socket.emit("send_typing_message", {
      message: typingMessage,
      from: username,
      pfp: pfpIndex,
      room: roomID,
    });
  };

  const handleJoinGlobalChat = () => {
    socket.emit("user_joined", {
      message: "joined",
      from: username,
      pfp: pfpIndex,
      room: roomID,
      time: new Date().toLocaleTimeString(),
    });
  };

  function handleCreatePfp(e) {
    e.preventDefault();
    setHasPfp(true);
    handleJoinGlobalChat();
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
          pfpArray={pfpArray}
          chatName={"global chat"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-17 group-hover:-rotate-10 text-green-sub-light -mt-10 bg-white p-3 rounded-t-full"
          >
            <path
              fillRule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.5 3.757a5.5 5.5 0 1 0 6.857-.114l-.65.65a.707.707 0 0 0-.207.5c0 .39-.317.707-.707.707H8.427a.496.496 0 0 0-.413.771l.25.376a.481.481 0 0 0 .616.163.962.962 0 0 1 1.11.18l.573.573a1 1 0 0 1 .242 1.023l-1.012 3.035a1 1 0 0 1-1.191.654l-.345-.086a1 1 0 0 1-.757-.97v-.305a1 1 0 0 0-.293-.707L6.1 9.1a.849.849 0 0 1 0-1.2c.22-.22.22-.58 0-.8l-.721-.721A3 3 0 0 1 4.5 4.257v-.5Z"
              clipRule="evenodd"
            />
          </svg>
        </Chatbox>
      ) : (
        <div>
          <Profile
            username={username}
            setUsername={setUsername}
            pfpIndex={pfpIndex}
            setPfpIndex={setPfpIndex}
            handleCreatePfp={handleCreatePfp}
            pfpArray={pfpArray}
          />
        </div>
      )}
    </div>
  );
}

export default GlobalChat;
