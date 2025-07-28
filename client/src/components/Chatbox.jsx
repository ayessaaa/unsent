import Receive from "./chatboxes/Receive";
import Send from "./chatboxes/Send";

function Chatbox() {
  return (
    <div>
      <div className="bg-white  w-180 mx-auto rounded-3xl shadow-sm mt-15 p-8">
        <div className="flex flex-col items-center">
          <img src="imgs/pfp.jpg" className="size-15 rounded-full"></img>
          <h1 className="text-4xl tracking-widest text-green-dark">forg</h1>
        </div>

        <div className="bg-green-sub-lightest w-full h-110 mt-5 rounded-3xl shadow-sm p-8 flex flex-col align-bottom justify-end">
          <div className="overflow-y-auto flex flex-col gap-1 pb-5">
            <div className="flex-1 text-center tracking-wider text-green-sub-dark text-lg">
              -- 9:15 pm --
            </div>
            <Receive>hey bro</Receive>

            <Send>hi dudeee !</Send>

            <Receive typing={true}>ugly</Receive>

            <Send typing={true}>wha ????</Send>
          </div>

          <div className=" flex justify-between items-center gap-2">
            <input
              className="w-full bg-white px-5 py-2 text-green-dark/70 text-3xl tracking-wide rounded-xl shadow-sm transition-all hover:bg-white/50 focus:bg-green-sub-dark focus:outline-0 focus:text-white"
              placeholder="type your message here ..."
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-8 text-green-dark cursor-pointer hover:-rotate-10 hover:scale-105 transition-all duration-300"
            >
              <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
