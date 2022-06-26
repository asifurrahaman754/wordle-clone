import { useEffect, useState, useContext } from "react";
import WordleContext from "../../context/WordleProvider";
import "./style.css";

export default function Modal({ fetchSolution, appEror }) {
  const [showModal, setshowModal] = useState(false);
  const [showText, setshowText] = useState("");
  const { turn, isCorrect } = useContext(WordleContext);

  const WINTEXT = "Congratulations, you have won the game 🎉🎉😍 🎉🎉";
  const LOSETEXT = "Sorry, you have lost the game 😢😢😢";
  const ERRORTEXT =
    "Error in getting solution. please refresh the browser or try again later!";

  useEffect(() => {
    //select the coresponsing text based on the  value
    if (isCorrect) {
      setshowText(WINTEXT);
      setTimeout(() => {
        setshowModal(true);
      }, 1700);
    } else if (turn === 6 && !isCorrect) {
      setshowText(LOSETEXT);
      setTimeout(() => {
        setshowModal(true);
      }, 1700);
    } else if (appEror) {
      setshowText(ERRORTEXT);
      setshowModal(true);
    }
  }, [isCorrect, appEror, turn]);

  const handleReplayClick = () => window.location.reload();

  return (
    <>
      {showModal && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <h3 className="text">{showText}</h3>
            {!appEror && (
              <button className="replay" onClick={handleReplayClick}>
                Try for a new word
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
