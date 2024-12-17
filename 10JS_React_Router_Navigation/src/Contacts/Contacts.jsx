import "./styleContacts.css";
import {useLoaderData} from 'react-router-dom';

import {contacts} from "../data/data.js";

export function loader({params}) {
  if (Object.entries(params).length === 0) { // IF we are not on any route, everything OK!
    return params;

  } else {   // We are on contacts route!
      if (!contacts.some(contact => contact.id === Number(params.id))) { // CHECK, if the given URL ID exists in contacts
        const error = new Error('Contact with this ID not found');
        error.status = "Error!"; // Setting error messages, and throwing error
        error.statusText = `Contact with "${params.id}" ID not found`;
        throw error;
    }
    // IF an ID match is found, return
    return params;
  }
}

export default function Contacts() {
  const params = useLoaderData();
  const renderPerson = contacts.filter(contact => Number(params.id) === contact.id);
  return (
    <>
      <div className="contactPage">
        Contact info of {renderPerson[0].name}
        <p className="info">Name: {renderPerson[0].name}</p>
        <p className="info">Phone: {renderPerson[0].phone}</p>
        <p className="info">Email: {renderPerson[0].email}</p>
      </div>
    </>
  );
}
