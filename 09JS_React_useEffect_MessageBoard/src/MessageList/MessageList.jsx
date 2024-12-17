import { useState, useEffect } from 'react';

import "./styleMessageList.css";

import Message from "./Message.jsx";
import MessageInput from "../MessageInput/MessageInput.jsx";

import * as service from "../services.js";

export default function MessageList() {

  const[messages, setMessages] = useState([]);

  function timeSorter (a, b) {
    const a_milliSec = new Date(a.timestamp);
    const b_milliSec = new Date(b.timestamp);
    if (a_milliSec.getTime() < b_milliSec.getTime()) {
      return 1;
    }
    if (a_milliSec.getTime() > b_milliSec.getTime()) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function getMessages () {
      const messages = await service.getMessages();
      const newMessages = messages.sort(timeSorter);
      setMessages(newMessages);
    }
    getMessages();
  },[]);

  async function postToServer(newMessage) {
    const data = await service.postMessage(newMessage);
    const dataObject = {
      message_id: data.id, sender_key: data.sender_key, 
      sender_name: data.sender_name, content: data.message, 
      timestamp: data.timestamp};
    setMessages([dataObject, ...messages]);
  }

  async function deleteMessage(event, ID, userKey) {
    const data = await service.deleteMessage(ID, userKey);
    if (data.status === 200 && data.statusText === "OK") {
        const newMessages = messages.filter(message => {
        return message.message_id !== ID
      });
      setMessages(newMessages);
    }
  }

  async function commitUpdate(event, ID, userKey, newMessage) {
    try {
    const response = await service.updateMessage(userKey, ID, newMessage);
    // Only one of these checks would be enough
    if (response.status === 201 && response.statusText === "Created") {
      const newMessages = messages.map(message => {
        return message.message_id === Number(ID) ?
        {
          message_id: response.data.id, sender_key: response.data.sender_key, 
          sender_name: response.data.sender_name, content: response.data.message, 
          timestamp: response.data.timestamp}
          :
          message // If the ID does not match, just keep old message
      });
      setMessages(newMessages);
    }
   } catch {
      console.log("No message with that ID");
    }
  }


  return (
    <>
      <MessageInput 
      postToServer = {postToServer}
      />
      <ul className="allMessages" style={{listStyle: "none"}}>
          {messages.map(message => {
              return(
                  <Message
                  message = {message}
                  deleteMessage = {deleteMessage}
                  commitUpdate = {commitUpdate}
                  />
              );
          })}
      </ul>
    </>
  );
}
