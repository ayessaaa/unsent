function Send({ typing = false, time, children }) {
  return (
    <div className="flex gap-5 pl-30 pr-10 align-bottom items-end animate__fadeInUpBig animate__animated animate__faster">
      <div className="flex flex-col items-end ml-auto">
        <p
          className={` ${
            !typing ? "text-green-sub-dark" : "text-green-sub-dark/40 italic"
          } tracking-wide`}
        >
          {typing ? "u are typing..." : ""}
        </p>
        <div className="flex gap-5 items-center group">
          <p className=" group-hover:opacity-100 opacity-0 transition-all tracking-wide text-green-sub-dark/50">
            {time}
          </p>
          <div
            className={`${
              !typing ? "bg-green-sub-dark" : "bg-green-sub-dark/30"
            } tracking-wider text-white text-2xl/7 w-fit px-6 py-1.5 rounded-xl right-0`}
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
    </div>
  );
}

export default Send;
