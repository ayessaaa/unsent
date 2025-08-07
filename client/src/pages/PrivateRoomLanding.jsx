import { useState } from "react";
import Clouds from "../components/Clouds";
import BgElements from "../components/BgElements";
import Logo from "../components/Logo";
import Mode from "../components/Mode";
import Profile from "../components/Profile";

function PrivateRoomLanding() {
  const pfpArray = [
    "/imgs/pfp/bear1.PNG",
    "/imgs/pfp/frog1.PNG",
    "/imgs/pfp/dino1.PNG",
    "/imgs/pfp/bird1.PNG",
  ];

  const [roomUsers, setRoomUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [pfpIndex, setPfpIndex] = useState(1);
  const [hasPfp, setHasPfp] = useState(false);

  const roomID = "";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theirTypingMessages, setTheirTypingMessages] = useState([]);

  const [mode, setMode] = useState("private");

  const [switchModeClicked, setSwitchModeClicked] = useState(false);

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
      <Mode
        roomID={roomID}
        mode={mode}
        setMode={setMode}
        setSwitchModeClicked={setSwitchModeClicked}
      />
      
    </div>
  );
}

export default PrivateRoomLanding;
