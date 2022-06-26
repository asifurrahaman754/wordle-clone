import { useContext } from "react";
import WordleContext from "../../context/WordleProvider";
import { decryptSolution } from "../../util";

export default function useKeyboard(animationTime) {
  const {
    turn,
    setCurrentGuess,
    currentGuess,
    isCorrect,
    history,
    lastUsedKeys,
    setGuesses,
    setLastUsedKeys,
    setHistory,
    setTurn,
    setIsCorrect,
  } = useContext(WordleContext);
  const solutionKey = localStorage.getItem("encrypted-solution");
  const solution = decryptSolution(solutionKey);

  // handle keyup event & track current guess
  const handleKeyup = (e) => {
    let pressedKey = "";

    //if game is already won then return
    if (isCorrect) return;

    //check game keyboard is fake-keyboard or device keyboard
    if (typeof e == "string") {
      pressedKey = e;
    }

    //if user presses enter, add the new guess
    if (e.keyCode === 13 || pressedKey === "Enter") {
      //if user does not has turns
      if (turn > 5) return;

      //if the user submit duplicate word then return
      if (history.includes(currentGuess)) {
        alert("Same word already exists");
        return;
      }

      //if the letter length is not 5
      if (currentGuess.length !== 5) {
        alert("You must type at least 5 letters!");
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
    }
  };

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

  // add the new guess to the states
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
    setCurrentGuess("");
  };

  // show the used keys of the last guess
  function showUsedKeys() {
    const btnKeys = document.querySelectorAll(".key");
    const colors = {
      yellow: "hsl(49, 51%, 57%)",
      green: "hsl(115, 29%, 53%)",
      grey: "hsl(200, 2%, 48%)",
    };

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
      }, animationTime);
  }

  return { handleKeyup, showUsedKeys };
}
