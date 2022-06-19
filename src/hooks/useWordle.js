import { useState } from "react";

const useWordle = (solution, showUsedKeys) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lastUsedKeys, setLastUsedKeys] = useState([]);

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
    setGuesses((prevGuessess) => {
      let newGuess = [...prevGuessess];
      newGuess[turn] = formattedGuess;
      return newGuess;
    });
    setLastUsedKeys(formattedGuess);
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);
    showUsedKeys();
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  const handleKeyup = (e) => {
    let pressedKey = "";

    //if game is already won then return
    if (isCorrect) return;

    //check game keyboard is typed or device keyboard
    if (typeof e == "string") {
      pressedKey = e;
    }

    //if user presses enter, add the new guess
    if (e.keyCode === 13 || pressedKey === "enter") {
      //if user does not has turns
      if (turn > 5) return;

      //if the user submit duplicate word then return
      if (history.includes(currentGuess)) {
        alert("Same word already exists");
        return;
      }

      //if the letter length is not 5
      if (currentGuess.length !== 5) {
        alert("Word must be 5 letters long");
        return;
      }

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
      return;
    }

    //if user presses backspace, delete the last letter
    if (e.keyCode === 8 || pressedKey === "delete") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (currentGuess.length >= 5) return;

    //if user presses a letter, add the letter to the current guess
    const checkPressedKey = pressedKey ? pressedKey : e.key;
    if (/^[A-Za-z]$/.test(checkPressedKey)) {
      setCurrentGuess((prev) => prev + checkPressedKey.toLowerCase());
      console.log(currentGuess.length);
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, lastUsedKeys };
};

export default useWordle;
