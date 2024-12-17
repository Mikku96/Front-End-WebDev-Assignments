import { useState } from "react";

import "./styleApp.css";

import Button from "./Button/Button";
import Keyboard from "./Keyboard/Keyboard";
import Display from "./Display/Display";
import Lives from "./Lives/Lives";
import Info from "./Info/Info";

import fourLetterWords from "./fourLetterWords.js";
import fiveLetterWords from "./fiveLetterWords.js";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  return randomValue;
}

export default function App() {

  //#################################
  //####### SETTING UP STATES #######
  //#################################

  // Different game states, and header text
  const [gameState, setGameState] = useState("gameStart");
  const [showRestart, setRestart] = useState(false);
  const [header, setHeader] = useState("Welcome!")

  // Scores and other counters
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);

  // Word set states
  const[wordSet, setWordSet] = useState(fourLetterWords);
  const[correctInRow, setCorrectInRow] = useState(0);

  // Word choosing and button content
  const [chosenWord, setNewWord] = useState(loadWord());
  const [buttons, setButtons] =  useState();
  const[chosenLetters, setChosenLetters] = useState("");

  // Is the user correct, change background
  const[answerStyle, setAnswerStyle] = useState("white");

  // For every new word, randomize button order and 
  // initialize them into an object array
  function buttonInitialize(chosenWord) {
    const buttonOrder = chosenWord.slice();
    return (buttonOrder
    .sort(() => 0.5 - Math.random()) // Randomizer letter order
    .map((letter, index) => {
        return (
          {buttonID: index, buttonLetter: letter, visible: true}
        );
    }))
  }
  // Get a new word, and immediately split it to an array of letters
  function loadWord() {
    return (wordSet[getRandomIntInclusive(0,999)]
    .split("")); // Split the word into an array of letters
  }

  // Everytime the whole game is restarted
  // Due to game over, or "page load"
  function initializeGame() {
    setLives(2);
    setScore(0);
    setRestart(false); // No restart button needed
    setChosenLetters(""); // User has done no input yet
    setButtons(buttonInitialize(chosenWord));
    setAnswerStyle("white");
    setGameState("gameOn");
  }

  // When user wants a new word (by clicking "RESTART" button)
  function reloadWord() {
    setRestart(false);
    setChosenLetters("");
    setButtons(buttonInitialize(chosenWord));
    setAnswerStyle("white");
    setGameState("gameOn");
  }

  // THIS can be seen as the main logic
  // What happens, when user clicks a letter-button
  function removeButton(event, clickedID) {

    // First, "remove" the pressed button
    setButtons(prevButtons => prevButtons
      .map(button =>
         button.buttonID === clickedID ? {...button, visible: !button.visible} : button )
      );
    
    // Add the chosen letter to the text-field
    setChosenLetters(prevLetters => prevLetters + event.target.textContent);

    // If during this run, the word length is reached, do the following
    if (chosenLetters.length + 1 === chosenWord.length) {
      if(chosenLetters + event.target.textContent === chosenWord.join("")) {

        // For exactly RIGHT answer

        setScore(prev => prev + 1);
        setCorrectInRow(prev => prev + 1);
        setChosenLetters("Correct!");
        setAnswerStyle("lime");
        setLives(2);
        
      } else if (wordSet.includes(chosenLetters + event.target.textContent)) {

        // For if the word IS in the list, but not the one we wanted
        setScore(prev => prev+1);
        setCorrectInRow(prev => prev + 1);
        setChosenLetters("Correct(?)");
        setAnswerStyle("yellow");
        setLives(2);

      } else {

        // Incorrect, lose a life!

        setLives(prev => prev-1);
        setCorrectInRow(0);
        setChosenLetters("Incorrect!");
        setAnswerStyle("pink");
        if (lives <= 0) {

          // If lives drop to zero, set header to Game over, and return to start
          setWordSet(fourLetterWords);
          setHeader("Game Over!")
          setGameState("gameStart")
          setNewWord(loadWord());
          return;
        }
      }

      // LOGIC HERE, What happens when user answers correctly 5 times in row
      // I do not have interest to add more word-sets to expand this
      // Since I have also taken the assignment to different direction (with lives)
      // A starting point at least
      if (correctInRow + 1 === 4) {
        setCorrectInRow(0);
        setWordSet(fiveLetterWords)
      }
      setRestart(true); // When points are checked, etc., give a restart button (New word)
      setNewWord(loadWord());
    }
  }

  return (
    <div className="appContainer">
      <div className="gameScreen">
        {gameState === "gameStart" &&
          <>
          <Info 
          initializeGame = {initializeGame}
          score = {score}
          header = {header}     
          />
          </>
        }
        {gameState === "gameOn" &&
          <>
            <div className="letterBarContainer">
              <Display 
              chosenLetters = {chosenLetters}
              answerStyle = {answerStyle}/>
            </div>
            <div className="letterButtons">
              <Keyboard 
              buttonArray = {buttons}
              removeButton = {removeButton}/>
            </div>
            {showRestart && 
              <Button
              singleButton={{buttonID: "gameStarter", buttonLetter:"New word", visible:true}}
              buttonFunction = {reloadWord}
              />
            }
            <div className="liveBarContainer">
              <Lives
              livesLeft = {lives}
              />
            </div>
            <p className="scoreInGame">Score: {score}</p>
          </>
        }
      </div>
    </div>
  );
}
