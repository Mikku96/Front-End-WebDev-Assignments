import { useState, useRef, useEffect } from 'react'

// array of words
import words from "./words.js";

import state0 from "./assets/state0.png";
import state1 from "./assets/state1.png";
import state2 from "./assets/state2.png";
import state3 from "./assets/state3.png";
import state4 from "./assets/state4.png";
import state5 from "./assets/state5.png";
import state6 from "./assets/state6.png";

const images = [state0, state1, state2, state3, state4, state5, state6];

import GameForm from "./GameForm/GameForm";

import "./styleApp.css";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  return randomValue;
}

export default function App() {

  const [state, setState] = useState({
    word: words[getRandomIntInclusive(0, words.length - 1)],
    changesLeft: 6,
    guesses: [],
    status: "on", // Game starts at ON state, no reason for "main menu" this time. "on", "victory", "lost"
    guessInput: "",
    latestGuessValid: "" // True, False, or empty
  });

  // Asked AI, how to make it so that the input field is auto-focused on with React
  // Suggested use of useRef and useEffect hooks
  const inputRef = useRef(null);

  useEffect(() => {
    if (state.status === "on" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.status, state.guessInput]);


  function handleGuess (chosenLetter) {

    // Nothing changes, if letter is already used and user inputs it again
    if (state.guesses.includes(chosenLetter)) {
       return;
    }

    // Check, if the input letter is in the random word
    let newChangesLeft = state.changesLeft;
    let newLatestGuessValidity = "";
    let newStatus = "on";

    if (state.word.includes(chosenLetter)) {
      newLatestGuessValidity = true;
      for (let character of state.word.split("")) {
          if (state.guesses.includes(character) || character === chosenLetter) {
            newStatus = "victory"; // If we always find the words character in our guesses, we are done!
          } else {
            newStatus = "on"; // If even ONCE we do not match a character, then game continues
            break;
          }
      }
    } else { // If the picked letter is not within the word
      newLatestGuessValidity = false;
      newChangesLeft = state.changesLeft - 1;
      if (state.changesLeft - 1 === 0) {
        newStatus = "lost";
      }
    }

    // Lastly, construct the new state:
    const newState = {...state, 
      changesLeft: newChangesLeft,
      guesses: [...state.guesses, chosenLetter],
      status: newStatus,
      guessInput: "",
      latestGuessValid: newLatestGuessValidity
    };
    setState(newState);
  };

  function handleSubmit (event) {
    event.preventDefault();

    const submitLetter = state.guessInput;
    if (submitLetter.length === 1) {
      handleGuess(submitLetter);
      return;
    }
    console.log("User tried to send an empty field OR over 1 letter long word");
  }

  // When user types into the input box
  function changeInput (event) {
    if (/^[a-z]$/.test(event.target.value)) { // Check that user input is a letter
      const newState = {...state, guessInput: event.target.value.toLowerCase()};
      setState(newState);
      return;
    }
    console.log("User input something that is not a letter");
    // It just happens, that "backspace works" if we empty the state
    const newState = {...state, guessInput: ""};
    setState(newState);
  }


  function resetGame () {
    const newState = {
      word: words[getRandomIntInclusive(0, words.length - 1)],
      changesLeft: 6,
      guesses: [],
      status: "on",
      guessInput: "",
      latestGuessValid: ""
    };
    setState(newState);
  };

  function showWord(){
    return state.word.split("").map((character, index) => (
      <p key={index + character} className="letterOfWord">
        {/* If character of the word is in guessed characters, show the character */}
        {/* If not, then _ */}
        {state.guesses.includes(character) ? character : "\xa0"}
      </p>
    ));
  };


  return (
    <div className="appArea">
    <h1>Hangman</h1>
    <img className="hangmanImageState" src={images[state.changesLeft]}/>
    <p>Guesses left: {state.changesLeft} / 6</p>
    <div className="usedLettersRow">
    <p>Used letters:</p>
    <p className="usedLetters">{state.guesses.join('').toUpperCase()}</p>
    </div>
    
    {state.latestGuessValid === true &&
      <p>Hey! "{state.guesses.slice(-1).join("").toUpperCase()}" is in the word!</p>
    }
    {state.latestGuessValid === false &&
      <p>No! "{state.guesses.slice(-1).join("").toUpperCase()}" is not in the word!</p>
    }

    <p className="statusText">{state.status === "victory" ? "You won!" : state.status === "lost" ? `Game Over! Correct word was "${state.word}"` : "Submit a new letter (Enter works)"}</p>

    {state.status === "on" &&
    
      <GameForm
      currentGuess = {state.guessInput}
      changeInput = {changeInput}
      handleSubmit = {handleSubmit}
      currentGameState = {state.status}
      inputRef = {inputRef}
      />   
    }

    {(state.status === "victory" || state.status === "lost") &&
    <button onClick={resetGame}>Reset game</button>
    }
    <div className="randomWord">{showWord()}</div>
    </div>
  );
}
