import Receive from "./chatboxes/Receive";
import Send from "./chatboxes/Send";
import { useEffect, useRef, useState } from "react";

function Chatbox({
  message,
  setMessage,
  handleSendMessage,
  messages,
  handleTyping,
  theirTypingMessages,
  landing=false,
  className = "",
  username
  
}) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, message, theirTypingMessages]);

  console.log(messages)

  return (
    <div className={className}>
      <div className="bg-white  w-180 mx-auto rounded-3xl shadow-sm mt-3 p-5">
        <div className="flex flex-col items-center">
          <img src="/imgs/pfp/frog1.PNG" className="bg-green-light/50 size-12 rounded-full p-0.5"></img>
          <h1 className="text-3xl tracking-widest text-green-dark">yessa</h1>
        </div>

        <div className={`${landing? "h-85": "h-100"} bg-green-sub-lightest w-full mt-2 rounded-3xl shadow-sm p-5 flex flex-col align-bottom justify-end`}>
          <div className="overflow-y-auto flex flex-col overflow-x-visible">
            <div className="flex gap-1 pb-5 flex-col">
              <div className="flex-1 text-center tracking-wider text-green-sub-dark text-lg transition-all ">
                -- joined --
              </div>
              {messages.map((msg, index) =>
                msg.from === username ? (
                  <Send
                    key={index}
                    time={
                      msg.time.split(":")[0] +
                      ":" +
                      msg.time.split(":")[1] +
                      " " +
                      msg.time.split(" ")[1]
                    }
                  >
                    {msg.message}
                  </Send>
                ) : (
                  <Receive
                    key={index}
                    followingMessage={index !== 0 && messages[index - 1].from === msg.from}
                    user={msg.from}
                    pfp={msg.pfp}
                    time={
                      msg.time.split(":")[0] +
                      ":" +
                      msg.time.split(":")[1] +
                      " " +
                      msg.time.split(" ")[1]
                    }
                  >
                    {msg.message}
                  </Receive>
                )
              )}
              {theirTypingMessages.map((typingMsg, index) => (
                typingMsg.message &&
                <Receive
                  key={index}
                  typing={true}
                  user={typingMsg.from}
                  pfp={typingMsg.pfp}
                >
                  {typingMsg.message}
                </Receive>
              ))}
              {/* {theirTypingMessage.message && <Receive typing={true} user={theirTypingMessage.from}>{theirTypingMessage.message}</Receive>} */}

              {message && <Send typing={true}>{message}</Send>}
              <div ref={bottomRef} className={(message  ? "pb-3"  : "")+ " transition-all"} />
            </div>
          </div>

          <form
            className=" flex justify-between items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
            
              className="w-full bg-white px-5 py-2 text-green-dark/70 text-2xl tracking-wide rounded-xl shadow-sm transition-all hover:bg-white/50 focus:bg-green-sub-dark focus:outline-0 focus:text-white"
              placeholder="type your message here ..."
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping(e.target.value); 
              }}
              value={message}
              disabled={landing}
            ></input>

            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-8 text-green-dark cursor-pointer hover:-rotate-10 hover:scale-105 transition-all duration-300"
              >
                <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
