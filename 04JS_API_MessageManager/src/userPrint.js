import axios from "axios";
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export async function userPrint(source) {
    try {
        const reader = createInterface(stdin, stdout);
        console.log(" ");
        const userName = await reader.question("Input username whose messages you want to print: ");
        reader.close();
        console.log(" ");

        const response = await axios.get(source, {params: {user: userName}});
        if (response.data.length === 0) {
            console.log(`No messages from user ${userName}`);
            return;
        }
        response.data.forEach(messageElement => {
        console.log(messageElement.user + " [" + messageElement.id + "] " + ": " + messageElement.text);
        }); // Log all the messages from the chosen user
        console.log(" ");
        return;

    } catch (error) {
        console.log("Error with printing - is the server down?");
        return;
    }
}