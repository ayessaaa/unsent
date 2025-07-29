function Receive({ typing = false, followingMessage = false, time, children }) {
  return (
    <div className="flex gap-5 pr-30 align-bottom items-end animate__fadeInUpBig animate__animated animate__faster">
      {!followingMessage ? (
        <img
          src="/imgs/pfp.jpg"
          className={`size-12 rounded-full ${typing && "opacity-50"}`}
        ></img>
      ):(
        <p className="ml-12"></p>
      )}
      <div>
        {followingMessage || (
          <p
            className={` ${
              !typing ? "text-green-sub-dark" : "text-green-sub-dark/40 italic"
            } tracking-wide`}
          >
            {typing ? "forg is typing..." : "forg"}
          </p>
        )}
        <div className="flex gap-5 items-center group">
          <div
            className={`${
              !typing
                ? "bg-green-light text-green-dark"
                : "bg-green-light/30  text-green-dark/30"
            } tracking-wider text-3xl/7 w-fit px-7 py-2 rounded-xl `}
          >
            {children}
            {typing && (
              <span className="text-green-dark/20 animate__animated animate__flash animate__infinite animate__slower">
                I
              </span>
            )}
          </div>
          <p className=" group-hover:opacity-100 opacity-0 transition-all tracking-wide text-green-sub-dark/50">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Receive;
