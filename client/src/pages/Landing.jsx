import Chatbox from "../components/Chatbox";
import Clouds from "../components/Clouds";
import Logo from "../components/Logo";

function Landing() {
  return (
    <>
      <Clouds />
      <div className="pt-10">
        <Logo />
      </div>
      <Chatbox />
    </>
  );
}

export default Landing;
