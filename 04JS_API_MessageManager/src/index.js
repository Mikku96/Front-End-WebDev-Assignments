import { printAll } from "./printAll.js"
import { userPrint } from "./userPrint.js"
import { writeMessage } from "./writeMessage.js"
import { editMessage } from "./editMessage.js"
import { deleteMessage } from "./deleteMessage.js"  // My sub-functions

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const operations = {    // My sub-functions in an object, key is the user input
    "A" : printAll,
    "U" : userPrint,
    "W" : writeMessage,
    "E" : editMessage,
    "D" : deleteMessage
}

async function commandPrint() {
    console.log(`Commands to interact with Messages API:
##########################################################
Q -> QUIT
A -> PRINT ALL MESSAGES
U -> PRINT MESSAGES FROM AN USER (input name when asked)
W -> WRITE NEW MESSAGE (input username and message when asked)
E -> EDIT A MESSAGE (input id and a new message when asked)
D -> DELETE A MESSAGE (input id when asked)
##########################################################
    `);
}

async function userInput() {
    const reader = createInterface(stdin, stdout);
    console.log(" ");
    const input = await reader.question("What's your command?: ");
    reader.close();
    return input;
}

async function aSyncWrapper() {
    // Input the API URL here
    const source = "";

    while (true) {
        await commandPrint();
        const chosenCommand = await userInput();
        if (chosenCommand.toUpperCase() === "Q") {
            process.exit(1);  // Exit the whole program when user wants things to end...
        }
        if (chosenCommand === "") {
            continue;   // Empty input is ignored
        } else if (!Object.keys(operations).includes(chosenCommand.toUpperCase())) {   // If user inputs invalid command
            console.log("Not a valid input!");
            console.log(" ");
            continue;
        }

        await operations[chosenCommand.toUpperCase()](source);  // Call command (imported function)

        const reader = createInterface(stdin, stdout);  // To give user time to analyze output
        console.log(" ");
        await reader.question("Press Enter to continue");
        reader.close();
    }
}

aSyncWrapper();