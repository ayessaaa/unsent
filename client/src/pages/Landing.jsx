import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";

function Landing() {
  const [messages, setMessages] = useState([]);

  const [message1, setMessage1] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessage1(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "hi!",
          from: "yessa",
          pfp: "/imgs/pfp/frog1.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 2000);

    const timer2 = setTimeout(() => {
      setMessage1(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "check out this amazing chat app",
          from: "yessa",
          pfp: "/imgs/pfp/frog1.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 3000);

    const timer3 = setTimeout(() => {
      setMessage1(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "made by me",
          from: "yessa",
          pfp: "/imgs/pfp/frog1.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 5000);

    const timer4 = setTimeout(() => {
      setMessage1(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "get started here ⬇⬇",
          from: "me",
          pfp: "/imgs/pfp/bear.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <>
      <Clouds />
      <div className="pt-10">
        <Logo />
      </div>
      <Chatbox landing={true} messages={messages} theirTypingMessage={""} />
    </>
  );
}


export default Landing;
