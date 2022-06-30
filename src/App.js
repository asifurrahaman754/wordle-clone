import "./App.css";
import { useEffect, useState } from "react";

import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { WordleProvider } from "./context/WordleProvider";
import { encryptSolution } from "./util";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  const [showIntroModal, setshowIntroModal] = useState(false);
  const [getWordErr, setgetWordErr] = useState(false);

  //set a new solution
  useEffect(() => {
    fetchSolutionWord();
  }, []);

  function fetchSolutionWord() {
    setgetWordErr(false);

    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=en")
      .then((res) => res.json())
      .then((data) => {
        const solution = encryptSolution(data[0]);
        //save the encrypted solution in the localstorage
        localStorage.setItem("encrypted-solution", solution);
        return "success";
      })
      .catch((err) => {
        setgetWordErr(true);
      });
  }

  return (
    <div className="App">
      <Intro
        showIntroModal={showIntroModal}
        setshowIntroModal={setshowIntroModal}
      />
      <Header
        setshowIntroModal={setshowIntroModal}
        fetchSolution={fetchSolutionWord}
      />
      <WordleProvider>
        <Board />
        <Keyboard />
        <Modal appEror={getWordErr} />
      </WordleProvider>
    </div>
  );
}

export default App;

/* 
check if a word is a real word or not
https://api.dictionaryapi.dev/api/v2/entries/en/hello
*/
