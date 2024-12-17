import Button from  "../Button/Button";

import "./styleInfo.css";

export default function Info( {initializeGame, score, header}) {
    // Info screen, which is rendered in the beginning and at game over
    // Show score only if the user HAS any score B)
    // A simple way to make it so, that a new player does not "have a previous score"
    // Could just be another state, "alreadyHasPlayed", BUT this works
    return(
        <div className="startScreen">
            <h1 className="gameHeader">{header}</h1>
            <div className="gameStartButton">
                <Button
                singleButton={{buttonID: "gameStarter", buttonLetter:"Game Start", visible:true}}
                buttonFunction = {initializeGame}
                />
            </div>
            {score > 0 &&
            <p>Your last score: {score}</p>
            }
        </div>
    );
}


