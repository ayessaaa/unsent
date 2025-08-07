import { useState } from "react";
import Button from "./Button";

function Dialog({ message, options, svgs, action }) {
  
  return (
    <>
      <div class="animate__animated animate__fadeIn fixed inset-0 bg-black/50 z-40"></div>
      <div class="animate__animated animate__bounceIn md:w-180 w-120 transition-all tracking-wide text-center text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 bg-green-sub-lightest px-8 py-5 text-green-dark rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-15 text-green-sub-dark mx-auto p-2.5 -mt-10 bg-green-sub-lightest rounded-t-full"
        >
          <path
            fillRule="evenodd"
            d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>

        {message}
        <div className="flex gap-3 mx-auto w-fit text-2xl text-green-sub-dark tracking-wider mt-5">
          {options.map((option, i) => (
            <Button
              color={"white"}
              key={option}
              onClick={() =>{ option.action(); action(false)}}
            >
              {option.svg}
              {option.message}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dialog;
