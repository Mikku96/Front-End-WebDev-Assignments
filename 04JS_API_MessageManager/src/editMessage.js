import axios from "axios";
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export async function editMessage(source) {
    try {
        console.log(" ");
        console.log("If you need the ID of a message, use command A first in the main menu!");
        console.log(" ");

        const reader = createInterface(stdin, stdout);
        const messageID = Number(await reader.question("Input message ID: "));
        if (isNaN(messageID)) {
            console.log("ID has to be number");
            reader.close();
            return;
        }

        const textInput = await reader.question("Write a new message: ")
        if (textInput.length < 1) {
            console.log("Message length must be at least 1 symbols long"); // Should include MAXIMUM Length
            reader.close();
            return;
        }
        reader.close();

        console.log(" ");

        const response = await axios.patch(source + "/" + messageID, {text: textInput});
        console.log("Message edited!");
        //console.log(response);
        return;

    } catch (error) {
        if (error.response.status === 404) {
        console.log("Error! Possibly message ID does not exist!");
        return;
    }
    }
}