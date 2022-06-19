import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Board from "./Board";
import "./Wordle.css";

export default function Wordle({ solution }) {
  const { turn, currentGuess, guesses, handleKeyup, lastUsedKeys } = useWordle(
    solution,
    showUsedKeys
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    showUsedKeys();

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    setKeyOnClick();
  }, []);

  const colors = {
    yellow: "hsl(49, 51%, 57%)",
    green: "hsl(115, 29%, 53%)",
    grey: "hsl(200, 2%, 48%)",
  };

  function showUsedKeys() {
    const btnKeys = document.querySelectorAll(".key");

    lastUsedKeys.length &&
      setTimeout(() => {
        btnKeys.forEach((btnKey, i) => {
          // check if the key is already used
          if (!btnKey.hasAttribute("data-used")) {
            //set the key to used with its color
            lastUsedKeys.map(({ key, color }) => {
              if (key === btnKey.innerText.toLowerCase()) {
                btnKey.setAttribute("data-used", true);
                btnKey.style.backgroundColor = colors[color];
                btnKey.style.color = "white";
              }
            });
          } else {
            return;
          }
        });
      }, 1600);
  }

  //set onclick event for each key
  function setKeyOnClick() {
    const allkey = document.querySelectorAll("[data-key]");

    allkey.forEach((btnKey) => {
      btnKey.addEventListener("click", function () {
        handleKeyup(btnKey.dataset.key);
      });
    });
  }

  //prettier-ignore
  return (
    <>
      <Board turn={turn} guesses={guesses} currentGuess={currentGuess}/>
      <div className="keyboard">
      <button className="key" data-key="Q">Q</button>
      <button className="key" data-key="W">W</button>
      <button className="key" data-key="E">E</button>
      <button className="key" data-key="R">R</button>
      <button className="key" data-key="T">T</button>
      <button className="key" data-key="Y">Y</button>
      <button className="key" data-key="U">U</button>
      <button className="key" data-key="I">I</button>
      <button className="key" data-key="O">O</button>
      <button className="key" data-key="P">P</button>
      <div className="space"></div>
      <button className="key" data-key="A">A</button>
      <button className="key" data-key="S">S</button>
      <button className="key" data-key="D">D</button>
      <button className="key" data-key="F">F</button>
      <button className="key" data-key="G">G</button>
      <button className="key" data-key="H">H</button>
      <button className="key" data-key="J">J</button>
      <button className="key" data-key="K">K</button>
      <button className="key" data-key="L">L</button>
      <div className="space"></div>
      <button className="key large" data-key="enter">Enter</button>
      <button className="key" data-key="Z">Z</button>
      <button className="key" data-key="X">X</button>
      <button className="key" data-key="C">C</button>
      <button className="key" data-key="V">V</button>
      <button className="key" data-key="B">B</button>
      <button className="key" data-key="N">N</button>
      <button className="key" data-key="M">M</button>
      <button className="key large" data-key="delete">
        <img src="/img/delete.svg" alt="delete icon" />
      </button>
      </div>
    </>
  );
}
