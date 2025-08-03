import 'animate.css';

function Logo({ height = "h-34" }) {
  return (
    <div>
      <img src="/imgs/logo.png" className={`mx-auto ${height}`}></img>
      <div className="px-5 py-1 w-fit mx-auto text-3xl bg-green-light text-green-dark rounded-3xl shadow-sm">
        <p className="tracking-widest">
          <span className="text-white mr-3">+</span> messaging{" "}
          <span className="text-white underline underline-offset-3">app</span>{" "}
          but worse <span className="text-white ml-3">+</span>
        </p>
      </div>
    </div>
  );
}

export default Logo;
