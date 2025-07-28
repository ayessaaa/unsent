function Send({ typing = false, children }) {
  return (
    <div className="flex gap-5 pl-30 pr-10 align-bottom items-end">
      <div className="flex flex-col items-end ml-auto">
        <p
          className={` ${
            !typing ? "text-green-sub-dark" : "text-green-sub-dark/40 italic"
          } tracking-wide`}
        >
          {typing ? "u are typing..." : ""}
        </p>
        <div
          className={`${
            !typing ? "bg-green-sub-dark" : "bg-green-sub-dark/30"
          } tracking-wider text-white text-3xl/7 w-fit px-7 py-2 rounded-xl right-0`}
        >
          {children}
          {typing && (
            <span className="text-white/90 animate__animated animate__flash animate__infinite animate__slower">
              I
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Send;
