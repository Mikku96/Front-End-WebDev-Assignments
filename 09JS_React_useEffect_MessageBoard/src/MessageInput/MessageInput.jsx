import { useState } from "react";

import "./styleMessageInput.css";

export default function MessageInput( {postToServer}) {

    const[newMessage, setNewMessage] = useState("");

    function processInput(event) {
        event.preventDefault();

        if (newMessage === "") {
            console.log("NO content in input box");
            return;
        }
        postToServer(newMessage);
        setNewMessage("");
    }

    function onChange(event, newValue) {
        setNewMessage(newValue);
    }

    return (
        <div className="inputFormField">
            <form className="formClass" value={newMessage} onSubmit={(event) => processInput(event)}>
                <textarea className="formTextArea" type="text" name="message" 
                value = {newMessage} placeholder="New message..."
                onChange={(event) => onChange(event, event.target.value)} />
                <button className="submitButton" type="submit">Post message</button>
            </form>
        </div>
    );
}