# Assignment - Flash Numbers

0. ```npm install``` and then ```npm start```

1. Let's create a memory game

2. Numbers appear for a while, and then disappear... user must input the numbers after this

    - First, 3s wait and numbers between 0 - 9 appear

    - For right answer, the time decreases by 250ms

    - When 1s is reached, add another digit to be remembered

    - New time limit is 1000ms * number of digits to remember

3. (Extra) Point counter

    - Answering correctly, when the waiting time is over 2000ms, gives 100 pts. 
    
    - 1750ms - 125 pts

    - 1500ms - 150 pts

    - 1250ms - 175 pts

    - 1000ms - 200 pts

    - The awarded point amount is the product between the point value and the number of digits

4. (Extra) - Ask the user to pick a difficulty

    . Easy: Numbers between 1-5, 1500ms / number

    - Normal: 0 - 9, 1000ms / number

    - Hard: 0 - 9  AND Letters A,B,C,D; 500 ms / symbol