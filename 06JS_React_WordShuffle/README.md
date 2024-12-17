# Assignment - Word Shuffle

0. ```npm install``` and ```npm run dev```

1. Create a word shuffling game

2. User is given 4 letters which the user must use to form a word

3. Before game starts:

    - Welcome message and "Game start" button are shown

4. After start, show a text field and the choises

    - Choise buttons disappear after a click

    - Input must be done through these buttons

5. After all the buttons have been used

    - Game indicates the result: Correct/Not the word we were looking for but OK/Incorrect

    - Restart button appears, and a new word is loaded

6. Component ```Display``` holds the shown letters

7. Component ```Keyboard``` shows the usable buttons

8. Component ```Info``` holds a message and the "Restart" button

    - The message is related to starting a new game etc.

9. Words are read from a .js file

10. (Extra) - If user inputs a valid word, but it was not the one we were looking for, still accept it!

12. [Only if I have time] (Extra) - Increasing difficulty

    - After some correct answers, start asking for 5 letter words

    - For three fails, either drop the difficulty or end the game

    - To make this work, some major rewriting would be needed... half complete!

        - My own solution for the main task was already a little bit different

    - A bug exists... related how the state updates can be late

    - If 5 letter words are reached, and then the game ends... the game does not reset back to 4 letter words immediately