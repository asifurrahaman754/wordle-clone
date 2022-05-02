import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects -[{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    const solutionArray = [...solution];

    const formattedGuess = [...currentGuess].map((l) => {
      //make the letter into objects
      return { key: l, color: "grey" };
    });

    //turn maching letter to green
    formattedGuess.forEach((obj, i) => {
      if (solutionArray[i] === obj.key) {
        obj.color = "green";
        solutionArray[i] = null;
      }
    });

    //turn maching but misplace leter to yellow
    formattedGuess.forEach((obj, i) => {
      if (obj.color !== "green" && solutionArray.includes(obj.key)) {
        obj.color = "yellow";
        solutionArray[solutionArray.indexOf(obj.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  const addNewGuess = (formattedGuess) => {
    if (solution === currentGuess) {
      setIsCorrect(true);
    }
    setGuesses((prevGuessess) => [...prevGuessess, formattedGuess]);
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  const handleKeyup = ({ key, keyCode }) => {
    //if game is already won then return
    if (isCorrect) return;

    //if user presses enter, add the new guess
    if (keyCode === 13) {
      //if user does not has turns
      if (turn > 5) return;

      //if the user submit duplicate
      if (history.includes(currentGuess)) {
        return;
      }
      //if the letter length is 5
      if (currentGuess.length !== 5) return;

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
      return;
    }

    //if user presses backspace, delete the last letter
    if (keyCode === 8) {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    //if user presses a letter, add the letter to the current guess
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
