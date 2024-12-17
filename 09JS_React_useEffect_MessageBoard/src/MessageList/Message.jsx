import "./styleMessage.css";
import { useState } from 'react';
import Modal from 'react-modal';

export default function Message( {message, deleteMessage, commitUpdate}) {

  // Used for basic solution!
  const [showEditBox, setShowEditBox] = useState(false);

  const [chosenMessage, setChosenMessage] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalStyle = {
    content: {
      border: '2px solid gray',
      backgroundColor: 'lightGray',
      width: "450px",
      height: "450px",
      textAlign: "center"
    }
  };

  function updateHandler() {
    setChosenMessage(message.content);
    //setShowEditBox(true);           // ENABLE for Basic Solution!
    setModalIsOpen(true);
  }


  return (
    <>
    <li className="singleMessage" key={message.message_id}>
        <div className="topBar">
            <p className="timeStamp">{message.timestamp}</p>
            <p className="messageID">{message.message_id}</p>
        </div>
        <div className="lowerBar">
            <p className="messageContent">{message.sender_name}: {message.content}</p>
            <div className="messageBoxButtons">
              <button className="deleteButton" 
              onClick={(event) => deleteMessage(event, message.message_id, message.sender_key)}>Delete message</button>
              <button className="editButton" 
              onClick={(event) => updateHandler(event)}>Edit message</button>
            </div>
        </div>
    </li>
    {/* BASIC SOLUTION!
    {showEditBox && 
      <div className="singleMessageEdit">
          <div className="lowerBar">
            <textarea className="editTextArea" value={chosenMessage} onChange={(event) => setChosenMessage(event.target.value)}/>
            <div className="messageBoxButtons">
              <button className="cancelButton" onClick={() => {setShowEditBox(false); setChosenMessage("")}}>Cancel</button>
              <button className="editButton" onClick={(event) => {commitUpdate(event, message.message_id, 
                message.sender_key, chosenMessage); setShowEditBox(false)}}>Update</button>
            </div>
          </div>
      </div>
    }
    */}
    {/* MODAL SOLUTION */}
      <Modal isOpen={modalIsOpen} style={modalStyle}>
              <h1>Edit chosen message</h1>
              <>
              <textarea className="editTextArea" value={chosenMessage} onChange={(event) => setChosenMessage(event.target.value)}/>
              </>
            <div className="messageBoxButtons">
              <button onClick={(event) => {commitUpdate(event, message.message_id, 
                    message.sender_key, chosenMessage); setModalIsOpen(false)}}>Update</button>
              <button onClick={() => {setModalIsOpen(false); setChosenMessage("")}}>Cancel</button>
            </div>
      </Modal>
    </>
  );
}
