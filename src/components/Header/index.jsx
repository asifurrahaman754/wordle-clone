import "./style.css";

export default function Header({ setshowIntroModal, fetchSolution }) {
  const handleResetClick = () => {
    //get a new word as a solution
    if (fetchSolution()) {
      console.log("fetch data success");
    }
  };

  return (
    <div className="App-header">
      <img
        className="App-header-icon"
        src="/img/help.svg"
        alt="intro"
        onClick={() => setshowIntroModal(true)}
      />
      <h1 className="App-header-logo">Wordle</h1>
      <img
        className="App-header-icon"
        src="/img/reset.svg"
        alt="reset"
        onClick={handleResetClick}
      />
    </div>
  );
}
