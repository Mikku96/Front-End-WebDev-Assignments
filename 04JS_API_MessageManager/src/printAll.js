import axios from "axios";

export async function printAll(source) {
    try {
        const response = await axios.get(source);
        response.data.forEach(messageElement => {
        console.log(messageElement.user + " [" + messageElement.id + "] " + ": " + messageElement.text); // Log all the messages
        });
        console.log(" ");
        return;
    
    } catch (error) {
        console.log("Error with printing - is the server down?");
        return;
    }
}