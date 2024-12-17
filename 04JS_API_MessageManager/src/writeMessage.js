import axios from "axios";
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export async function writeMessage(source) {
    try {
        const reader = createInterface(stdin, stdout);
        console.log(" ");
        const userName = await reader.question("Input username: ");
        if (userName.length < 2) {
            console.log("Username has to be at least 2 symbols long");
            reader.close();
            return;
        }

        const textInput = await reader.question("Write a message: ")
        if (textInput.length < 1) {
            console.log("Message length must be at least 1 symbols long");    // Should include MAXIMUM Length
            reader.close();
            return;
        }
        reader.close();

        console.log(" ");

        const response = await axios.post(source, {user: userName, text: textInput});
        console.log("Message sent!");
        //console.log(response);
        return;
        
    } catch (error) {
        console.log("Error with sending input - is the server down?");
        return;
    }
}