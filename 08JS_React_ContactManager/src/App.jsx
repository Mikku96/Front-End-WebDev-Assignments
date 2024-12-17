import { useState } from 'react';
import {v4 as uuid} from 'uuid';

import RenderContacts from "./RenderContacts/RenderContacts";
import ContactForm  from "./ContactForm/ContactForm";
import RenderUser from "./RenderUser/RenderUser";

import "./styleApp.css";

export default function App() {

  const [contactList, setContactList] = useState([
    {id: "", name: "", email: "", phone: "",
      address: "", website: "", notes:""
    }
  ]); // A sample file is required but it is "empty"

  const [shownUser, setShownUser] = useState({});

  // welcome, new user input and showing one user states
  const [secondColumnState, setState] = useState("welcome");

  // When adding new users
  function handleContactList (newContact) {
    const newID = uuid();
    const newContactList = [...contactList, {id: newID, ...newContact,}]
    setContactList(newContactList);
  }

  function removeUser (event, userID) {
    const newUsers = contactList.filter((user) => {
      return (user.id !== userID)
    });
    setContactList(newUsers);
    changeState("","welcome");
  }

  // We can get to different states; so different parameters needed
  function changeState (event, stateType, userID = "") {
    const findUser = contactList.filter((user) => {
      return (user.id === userID)
    });
    // So if the user has clicked a user, set that user to be shown
    setShownUser(findUser);
    setState(stateType);
  }

  return (
    <div className="contactManagerApp">
      <div className="currentUsers">
        <RenderContacts
          contacts = {contactList}
          changeState = {changeState}
        />
        <button type="button" onClick={(event) => changeState(event, "register")}>Add Contact</button>
      </div>

      {secondColumnState === "viewUser" &&
        <RenderUser
        contact = {shownUser}
        handleRemove = {removeUser}
        changeState = {changeState}
        />
      }

      {secondColumnState === "register" && 
      <div>
        <h1>Add a new Contact</h1>
        <ContactForm 
        handleContactList = {handleContactList}
        changeState = {changeState}
        />
      </div>
      }
      {secondColumnState === "welcome" &&
        <h1>Contact Manager</h1>
      }
    </div>
  );
}

