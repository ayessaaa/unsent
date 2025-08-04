import { useState } from "react";
import Button from "./Button";

function Profile() {
  const [pfpRight, setPfpRight] = useState(false);
  const pfpArray = [
    "/imgs/pfp/bear1.PNG",
    "/imgs/pfp/frog1.PNG",
    "/imgs/pfp/dino1.PNG",
    "/imgs/pfp/bird1.PNG",
  ];

  const [currentPfpIndex, setCurrentPfpIndex] = useState(1);

  function handlePfpClick(direction) {
    // if (currentPfpIndex < 0 && currentPfpIndex >= pfpArray.length) {
    if (direction === "left") {
      setCurrentPfpIndex((prevIndex) =>
        prevIndex === 0 ? pfpArray.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentPfpIndex((prevIndex) =>
        prevIndex === pfpArray.length - 1 ? 0 : prevIndex + 1
      );
    }
    // }
  }
  return (
    <>
      <div className="bg-green-sub-light tracking-wider rounded-2xl px-10 pt-2 pb-4 mt-8 w-fit mx-auto my-2 animate__animated animate__fadeIn text-white text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-12 -mt-7 rounded-full bg-green-sub-light p-2 mx-auto text-green-sub-lightest"
        >
          <path
            fillRule="evenodd"
            d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-center -mt-2 ">profile</p>
        <div className="flex items-center gap-3">
          {!currentPfpIndex - 1 < 0 ? (
            <img
              onClick={() => handlePfpClick("left")}
              src={pfpArray[currentPfpIndex - 1]}
              className="h-20 w-20 rounded-full mx-auto mt-2 opacity-70 transition-all cursor-pointer hover:scale-105 hover:-translate-y-1 hover:opacity-90"
              alt="Profile"
            />
          ) : (
            <div className="w-20"></div>
          )}

          <img
            src={pfpArray[currentPfpIndex]}
            className="h-30 w-30 rounded-full mx-auto mt-2"
            alt="Profile"
          />

          {currentPfpIndex + 1 < pfpArray.length ? (
            <img
              onClick={() => handlePfpClick("right")}
              src={pfpArray[currentPfpIndex + 1]}
              className={`h-20 w-20 rounded-full mx-auto mt-2 opacity-70 transition-all cursor-pointer hover:scale-105 hover:-translate-y-1 hover:opacity-90 `}
              alt="Profile"
            />
          ) : (
            <div className="w-20"></div>
          )}
        </div>
        <div className="mx-auto w-fit">
          <input
            className="w-full text-center bg-green-sub-lightest px-5 py-1 text-green-dark/70 text-2xl tracking-wider rounded-xl shadow-sm transition-all hover:bg-white/50 focus:bg-green-sub-dark focus:outline-0 focus:text-white"
            placeholder="username"
          ></input>
        </div>
      </div>
      
    </>
  );
}

export default Profile;
