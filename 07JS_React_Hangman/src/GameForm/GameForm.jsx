import "./styleGameForm.css";

export default function GameForm( {currentGuess, changeInput, handleSubmit, currentGameState, inputRef}) {

  return (
<   form className="gameFormArea" onSubmit={handleSubmit}>
        <input 
            className="inputBox"
            type="text"
            value={currentGuess}
            onChange={changeInput}
            maxLength="1"
            disabled={currentGameState !== "on"}
            ref={inputRef}
        />
        <button type="submit" disabled={currentGameState !== "on"}>Submit</button>
    </form>
  );
}
