import "./Board.css";
import Row from "./Row";

export default function Board({ currentGuess, turn, guesses }) {
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
