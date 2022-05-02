import { useRef, useEffect } from "react";
import "./Board.css";

export default function Board({ currentGuess }) {
  const boardRef = useRef(null);

  useEffect(() => {
    if (currentGuess) {
      const activeTiles = getactiveTiles();

      //if user type 5 letters then return;
      if (activeTiles.length >= 5) return;

      const key = currentGuess[currentGuess.length - 1];
      const board = document.querySelector(".board-container");
      const nextTile = board.querySelector(":not([data-letter])");
      nextTile.dataset.letter = key.toLowerCase();
      nextTile.textContent = key;
      nextTile.dataset.state = "active";
    }
  }, [boardRef, currentGuess]);

  function getactiveTiles() {
    return document.querySelectorAll("[date-state='active']");
  }

  return (
    <div className="board-container">
      <div ref={boardRef} className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
    </div>
  );
}
