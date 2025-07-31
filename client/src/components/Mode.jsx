import RoomID from "./RoomID";

function Mode({ mode, setMode, roomID }) {
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };
  return (
    <div className="flex justify-center items-end mt-10 w-180 mx-auto">
      <div className="flex items-center bg-white rounded-full p-1.5">
        <button
          onClick={() => handleModeChange("global")}
          className={`cursor-pointer  group rounded-full rounded-bl-full px-3 py-1 flex items-center gap-2 text-green-dark transition-all
        ${mode === "global" ? "bg-green-light" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-6 my-0.5 group-hover:rotate-10 transition-all group-hover:scale-110 group-hover:drop-shadow-[0_5px_5px_rgba(109,187,111,.5)]"
          >
            <path
              fillRule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.5 3.757a5.5 5.5 0 1 0 6.857-.114l-.65.65a.707.707 0 0 0-.207.5c0 .39-.317.707-.707.707H8.427a.496.496 0 0 0-.413.771l.25.376a.481.481 0 0 0 .616.163.962.962 0 0 1 1.11.18l.573.573a1 1 0 0 1 .242 1.023l-1.012 3.035a1 1 0 0 1-1.191.654l-.345-.086a1 1 0 0 1-.757-.97v-.305a1 1 0 0 0-.293-.707L6.1 9.1a.849.849 0 0 1 0-1.2c.22-.22.22-.58 0-.8l-.721-.721A3 3 0 0 1 4.5 4.257v-.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          onClick={() => handleModeChange("private")}
          className={`cursor-pointer text-white rounded-full px-3 py-1 flex items-center gap-2 group transition-all ${
            mode === "private" ? "bg-green-light" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-5 text-green-dark m-1 group-hover:rotate-10 transition-all group-hover:scale-110 group-hover:drop-shadow-[0_5px_5px_rgba(109,187,111,.8)]"
          >
            <path
              fillRule="evenodd"
              d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="text-center flex-1 text-white text-2xl tracking-wider">{mode} chat</p>
      <RoomID roomID={roomID} />
    </div>
  );
}

export default Mode;
