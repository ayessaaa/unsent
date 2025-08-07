import { useEffect, useState } from "react";
import BgElements from "../components/BgElements";
import Button from "../components/Button";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import Chatbox from "../components/Chatbox";
import io from "socket.io-client";
import Mode from "../components/Mode";
import Dialog from "../components/Dialog";

const socket = io.connect("http://localhost:3000");

function GlobalChat() {
  const pfpArray = [
    "/imgs/pfp/bear1.PNG",
    "/imgs/pfp/frog1.PNG",
    "/imgs/pfp/dino1.PNG",
    "/imgs/pfp/bird1.PNG",
  ];

  // const { users } = {};
  const [roomUsers, setRoomUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [pfpIndex, setPfpIndex] = useState(1);
  const [hasPfp, setHasPfp] = useState(false);

  const roomID = "global";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theirTypingMessages, setTheirTypingMessages] = useState([]);

  const [mode, setMode] = useState("global");

  const [switchModeClicked, setSwitchModeClicked] = useState(false);

  useEffect(() => {
    const handleUserJoined = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleUserLeft = (data) => {
      setMessages((prevMessages) => {
        const lastMsg = prevMessages[prevMessages.length - 1];
        // Compare stringified values or specific fields
        if (lastMsg && JSON.stringify(lastMsg) === JSON.stringify(data)) {
          return prevMessages; // Don't append if same as last one
        }
        return [...prevMessages, data];
      });
    };

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          from: data.from,
          pfp: data.pfp,
          time: new Date().toLocaleTimeString(),
          type: data.type,
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
    socket.on("user_left", handleUserLeft);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("receive_typing_message", handleReceiveTypingMessage);
    socket.on("room_users", (users) => {
      setRoomUsers(users);
      console.log([...users]);
    });

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("receive_typing_message", handleReceiveTypingMessage);
      socket.off("user_joined", handleUserJoined);
      socket.off("room_users");
    };
  }, [roomID, roomUsers]);

  const handleSendMessage = () => {
    const msg = {
      message,
      from: username,
      pfp: pfpIndex,
      room: roomID,
      time: new Date().toLocaleTimeString(),
      type: "message",
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
    socket.emit("join_room", {
      message: "joined",
      from: username,
      pfp: pfpIndex,
      room: roomID,
      time: new Date().toLocaleTimeString(),
      type: "logs",
    });
  };

  function handleCreatePfp(e) {
    e.preventDefault();
    setHasPfp(true);
    handleJoinGlobalChat();
  }

  return (
    <div className="">
      

      {switchModeClicked ? (
        <Dialog
          message={"joining a private room will make you leave the global chat"}
          options={["no i don't wanna leave", "yes let me leave"]}
          svgs={[
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-6 group-hover:-rotate-10"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>,
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-6 group-hover:-rotate-10"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>,
          ]}
        />
      ) : (
        ""
      )}

      <Clouds />
      <BgElements />
      <div className="pt-8">
        <Logo />
      </div>
      <Mode roomID={roomID} mode={mode} setMode={setMode} />

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
          users={roomUsers}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-17 group-hover:-rotate-10 text-green-sub-light -mt-10 bg-white p-2.5 rounded-t-full"
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
          <p className="text-center text-white text-3xl tracking-wide -mt-10">
            global chat
          </p>
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
