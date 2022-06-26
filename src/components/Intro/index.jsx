import { useEffect } from "react";
import "./style.css";

export default function Intro({ showIntroModal, setshowIntroModal }) {
  //if the user is new show the modal
  useEffect(() => {
    let isFirst = localStorage.getItem("isFirst");
    if (isFirst == null) {
      isFirst = 1;
    }

    if (isFirst == 1) {
      setshowIntroModal(true);
    }

    localStorage.setItem("isFirst", 0);
  }, []);

  return (
    <>
      {showIntroModal && (
        <div className="intro-modal-container">
          <div className="intro-modal-wrapper">
            <div className="intro-modal-header">
              <h3 className="title">how to play</h3>
              <img
                src="/img/close.svg"
                className="close-modal"
                onClick={() => setshowIntroModal(false)}
              />
            </div>
            <div className="modal-intro-details">
              <p>
                Guess the <strong>Word</strong> in 6 tries.
              </p>
              <p>
                {" "}
                Each guess must be a valid 5 letter word. Hit the enter button
                to submit.
              </p>
              <p>
                After each guesses the color the tiles will change to show how
                close your guess was to the actual word.
              </p>
            </div>
            <hr />
            <h4 className="image-header">Examples</h4>
            <img
              src="/img/wordle_rules.png"
              alt="wordle rules example"
              className="rules-img"
            />
            <p>click the refresh button for a new word.</p>
            <br />
            <p>
              <strong>Note</strong>: If you refresh the page a new solution word
              will load and your progress will be lost.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
