function Receive({ typing = false, children }) {
  return (
    <div className="flex gap-5 pr-30 align-bottom items-end">
      <img
        src="imgs/pfp.jpg"
        className={`size-12 rounded-full ${typing && "opacity-50"}`}
      ></img>
      <div>
        <p
          className={` ${
            !typing ? "text-green-sub-dark" : "text-green-sub-dark/40 italic"
          } tracking-wide`}
        >
          {typing ? "forg is typing..." : "forg"}
        </p>
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
      </div>
    </div>
  );
}

export default Receive;
