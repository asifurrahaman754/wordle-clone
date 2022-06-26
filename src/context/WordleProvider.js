import { createContext, useState } from "react";

const WordleContext = createContext();
export default WordleContext;

export function WordleProvider(props) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lastUsedKeys, setLastUsedKeys] = useState([]);

  return (
    <WordleContext.Provider
      value={{
        turn,
        setTurn,
        currentGuess,
        setCurrentGuess,
        guesses,
        setGuesses,
        history,
        setHistory,
        isCorrect,
        setIsCorrect,
        lastUsedKeys,
        setLastUsedKeys,
      }}
    >
      {props.children}
    </WordleContext.Provider>
  );
}
