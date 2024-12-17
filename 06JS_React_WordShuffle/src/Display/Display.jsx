import "./styleDisplay.css";

export default function Display( {chosenLetters, answerStyle}) {
    // chosenLetters is just a string of letters the user has already chosen
    // answerStyle refers to the background color - if the user is correct or not
    return (
        <div className="letterBar" style={{backgroundColor: answerStyle}}>
            {chosenLetters}
        </div>
    );
}

