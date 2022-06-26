import React, { useEffect } from "react";
import "./keyboard.css";
import useKeyboard from "./useKeyboard";

export default function Keyboard() {
  const animationTime = 1600;
  const { handleKeyup, showUsedKeys } = useKeyboard(animationTime);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    showUsedKeys();

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  //prettier-ignore
  const keyboardKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P','', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','','Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const handleClick = (key) => {
    handleKeyup(key);
    const el = document.querySelector('[data-key="Enter"]');

    if (key === "Enter") {
      el.classList.add("btn-disabled");

      //remove the class after the animationTime
      setTimeout(() => {
        el.classList.remove("btn-disabled");
      }, animationTime);
    }
  };

  return (
    <div className="keyboard">
      {keyboardKeys.map((key, index) => {
        if (key === "") {
          return <div className="space" key={index}></div>;
        } else {
          return (
            <div
              className={`${key === "Enter" ? "large key" : "key"}`}
              key={index}
              data-key={key}
              onClick={() => handleClick(key)}
            >
              {key}
            </div>
          );
        }
      })}

      <button
        onClick={() => handleKeyup("delete")}
        className="key large"
        data-key="delete"
      >
        <img src="/img/delete.svg" alt="delete icon" />
      </button>
    </div>
  );
}
