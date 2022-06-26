import { useContext } from "react";
import WordleContext from "../../context/WordleProvider";
import "./Board.css";
import Row from "./Row";

export default function Board() {
  const { currentGuess, turn, guesses } = useContext(WordleContext);

  return (
    <div className="board-container">
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} guess={guess} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={guess} />;
      })}
    </div>
  );
}
