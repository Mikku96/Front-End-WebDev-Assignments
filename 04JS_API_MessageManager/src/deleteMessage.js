import axios from "axios";
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

async function checkMessages(source) {  // I could just modify printAll.js to return the IDs but... better safe than sorry
    try {
        const response = await axios.get(source);
        const IDs = response.data.reduce((accumulator, messageElement) => {
        accumulator.push(messageElement.id);  // Save IDs into an array
        return accumulator; 
        },[]);
        return IDs; // Return ID array

    } catch (error) {
        console.log("Error ID accumulation - are the servers down?");
        return;
    }
}

export async function deleteMessage(source) {
    try {
        console.log(" ");
        console.log("If you need the ID of a message, use command A first in the main menu!");
        console.log(" ");

        const reader = createInterface(stdin, stdout);
        const messageID = Number(await reader.question("Input message ID which to delete: "));
        if (isNaN(messageID)) {
            console.log("ID has to be number");
            reader.close();
            return;
        }
        reader.close();

        console.log(" ");

        // BEFORE deletion, let's check that whatever we are deleting EXISTS...
        // Delete itself does not seem to CARE if the ID exists; tested with ID 10000 and "completed it" just fine
        // before I added this check
        const idArray = await checkMessages(source);
        if (!idArray.includes(messageID)) {
            console.log("Error! The input ID does not exist in the database.")
            return;
        }

        const response = await axios.delete(source + "/" + messageID);
        console.log("Message deleted!");
        return;

    } catch (error) {
        console.log("Error! Possibly problems with the server(?)");
    }
}