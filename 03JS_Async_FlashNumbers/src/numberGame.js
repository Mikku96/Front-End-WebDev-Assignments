import promptSync from 'prompt-sync';
const prompt = promptSync();    // To simplify input
// Prompt-sync let's me use INPUTTING inside a setTimeOut
// Noticed this when first I could not use readline due to an old version of node

const gameOptions = [
    {difficulty: "easy", "time": 1500, valueRange: [1,2,3,4,5]},
    {difficulty: "normal", "time": 1000, valueRange: [0,1,2,3,4,5,6,7,8,9]},
    {difficulty: "hard", "time": 500, valueRange: [0,1,2,3,4,5,6,7,8,9,"A","B","C","D"]}
];

function randomValueGenerator(valueOptions, numberCount) {
    const randomValues = [];
    for (let i = 1; i <= numberCount; i++) {
        randomValues.push(valueOptions[Math.floor(Math.random() * valueOptions.length)]); // An array of randomValues based on valueRange of a chosen difficulty
    }
    return randomValues;
}

function scoring(totalTime,numberCount) {   // The score user is awarded depends on the totalTime and number of values
    if (totalTime > 2000) { 
        return numberCount * 100;
    } else if (totalTime <= 2000 && totalTime > 1750) {
        return numberCount * 125;
    } else if (totalTime <= 1750 && totalTime > 1500) {
        return numberCount * 150;
    } else if (totalTime <= 1500 && totalTime > 1250) {
        return numberCount * 175;
    } else if (totalTime <= 1250 && totalTime >= 1000) {
        return numberCount * 200;
    }
}

const timeAndScore = (totalTime, valueOptions, numberCount) => {   
    return new Promise((resolve, reject) => {
        const randomValues = randomValueGenerator(valueOptions, numberCount);   // Generate the shown values
        console.log(randomValues);

        setTimeout(() => {
            console.clear();
            const input = prompt(`Input numbers (delimiter is space): `).split(" ");
            for (let i = 0; i < randomValues.length; i++) {
                if (String(randomValues[i]) !== String(input[i]))   // IF at anypoint, the user input differs from the randomly generated ones
                    reject(); // REJECT, basically error!
            }
            resolve(scoring(totalTime, numberCount));   // Send out the score
        },totalTime);   // Values are shown for "totalTime" amount, then cleared

    });
}

const chooseDifficulty = () => {
    return new Promise((resolve) => {
        const input = prompt("Type your chosen difficulty: Easy, Normal or Hard: ");
        const chosenOption = gameOptions.find(option => option.difficulty === input.toLowerCase());
        if (chosenOption === undefined) {   // If user inputs nothing or nonsense, choose normal
            resolve(gameOptions.find(option => option.difficulty === "normal"))
        }
        resolve(chosenOption);
    });
}

async function readLine() {
    let points = 0;
    let numberCount = 3;
    let possibleValues = [];
    let timeForAnswerSingle = 0;
    console.clear();    // Initialize variables, and clear the console

    await chooseDifficulty()    // Ask the user for the difficulty
    .then( // NOTICE that we do not capture errors, as any invalid value is turned into "normal" difficulty
        function(gameOption) {
            console.log(`Difficulty: ${gameOption.difficulty}`); 
            timeForAnswerSingle = gameOption.time;   // Read the time from gameOPTIONS array
            possibleValues = gameOption.valueRange; // As well as value range (numbers, or numbers + letters)
        }
    )   

    let timeForAllAnswers = timeForAnswerSingle * numberCount;    //initial time, the user is shown the values (3 values, so 3*)

    while (true) {
        if (timeForAllAnswers < 1000) {  // When the time answers are shown drops below 1s
            numberCount += 1;   // add another value to the shown ones
            timeForAllAnswers = numberCount * timeForAnswerSingle;  // And set the initial time back to a higher value
        }

        try { //Logic for user answers; we TRY and see, if the user answered correctly
            const obtainedPoints = await timeAndScore(timeForAllAnswers, possibleValues, numberCount);   
            points += obtainedPoints;
            console.log(`Correct! You obtained ${obtainedPoints} points.\nTotal now: ${points}`);
            timeForAllAnswers -= 250;    //Decrease the time answers are shown
        } catch { // With an incorrect answer, error occurs!
            console.log("You just lost the game. No points awarded for the last round."); 
            console.log(`You obtained: ${points} points in total`);
            break;
        }
    }
}   

readLine(); // Start game