import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";
import Button from "../components/Button";
import BgElements from "../components/BgElements";

function Landing() {
  const [messages, setMessages] = useState([]);

  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
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

    const timer5 = setTimeout(() => {
      setButton1(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "join global chat",
          from: "yessa",
          pfp: "/imgs/pfp/frog1.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 9000);

    const timer6 = setTimeout(() => {
      setButton2(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "or private rooms !",
          from: "me",
          pfp: "/imgs/pfp/bear.PNG",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 11000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  return (
    <>
      <Clouds />
      <BgElements />
      <div className="pt-8">
        <Logo />
      </div>
      <Chatbox landing={true} messages={messages} theirTypingMessage={""} className="mt-5" />

      <div>
        {button1 && (
          <Button className="mt-10" color="dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-7 group-hover:-rotate-10"
            >
              <path
                fillRule="evenodd"
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.5 3.757a5.5 5.5 0 1 0 6.857-.114l-.65.65a.707.707 0 0 0-.207.5c0 .39-.317.707-.707.707H8.427a.496.496 0 0 0-.413.771l.25.376a.481.481 0 0 0 .616.163.962.962 0 0 1 1.11.18l.573.573a1 1 0 0 1 .242 1.023l-1.012 3.035a1 1 0 0 1-1.191.654l-.345-.086a1 1 0 0 1-.757-.97v-.305a1 1 0 0 0-.293-.707L6.1 9.1a.849.849 0 0 1 0-1.2c.22-.22.22-.58 0-.8l-.721-.721A3 3 0 0 1 4.5 4.257v-.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-3xl">join global chat</p>
          </Button>
        )}

        {button2 && (
          <div className="bg-green-sub-light rounded-2xl px-3 pt-2 pb-3 mt-8 w-fit mx-auto my-2 animate__animated animate__fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-7 -mt-5 mx-auto text-green-sub-lightest bg-green-sub-light rounded-full pt-2  group-hover:-rotate-10"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-xl text-center text-white tracking-wider -mt-1">
              -- private rooms --
            </p>
            <div className="flex gap-2 items-center">
              <Button className="mt-2" color="light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-7 group-hover:-rotate-10"
                >
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
                <p className="text-2xl">create a room</p>
              </Button>
              <Button className="mt-2" color="light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-6 group-hover:-rotate-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-2xl">join a room</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Landing;
