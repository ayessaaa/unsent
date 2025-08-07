function Button({ className, color, type, onClick, scale="scale-105", children }) {
  return (
    <div
      className={
        className +
        ` mx-auto w-fit animate__animated animate__fadeIn animate__slow`
      }
    >
      <button
        onClick={onClick}
        type={type}
        className={` *:duration-300 *:group-hover:-translate-y-0.5  *:transition-all flex hover:${scale} justify-center items-center gap-2 tracking-wider w-fit mx-auto px-4 py-2 rounded-2xl shadow-sm group cursor-pointer transition duration-300 ${
          color === "dark"
            ? "*:group-hover:drop-shadow-[2px_2px_3px_rgba(255,255,255,0.2)] bg-green-dark text-white hover:bg-green-dark/80"
            : color === "white"
            ? "*:group-hover:drop-shadow-[2px_2px_3px_rgba(93,156,83,0.3)] bg-white text-green-sub-dark hover:bg-green-dark hover:text-white"
            : "*:group-hover:drop-shadow-[2px_2px_3px_rgba(93,156,83,0.3)] bg-green-sub-lightest text-green-sub-dark hover:bg-white"
        }`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
