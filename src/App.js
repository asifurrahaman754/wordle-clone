import "./App.css";
import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  // const [solution, setsolution] = useState(null);
  const solution = "bingo";

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=en")
      .then((res) => res.json())
      .then((data) => {
        // setsolution(data[0]);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img className="App-header-icon" src="/img/help.svg" alt="help icon" />
        <h1 className="App-header-logo">Wordle</h1>
        <img className="App-header-icon" src="/img/reset.svg" alt="help icon" />
      </div>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

/* 
check if a word is a real word or not
https://api.dictionaryapi.dev/api/v2/entries/en/hello
*/
