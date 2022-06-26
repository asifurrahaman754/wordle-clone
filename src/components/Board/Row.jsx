export default function Row({ guess, currentGuess }) {
  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="row">
        {letters.map((letter, i) => (
          <div key={i} data-state="active" className="tile">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} className="tile"></div>
        ))}
      </div>
    );
  }

  if (guess) {
    return (
      <div className="row">
        {guess.map((l, i) => {
          let state = "";
          if (l.color === "grey") {
            state = "absent";
          } else if (l.color === "green") {
            state = "correct";
          } else if (l.color === "yellow") {
            state = "present";
          }

          return (
            <div key={i} data-state={state} className="tile">
              {l.key}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
    </div>
  );
}
