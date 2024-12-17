import { useState } from 'react';

import "./styleRenderContacts.css";

import SearchBox from "./SearchBox/SearchBox";

export default function RenderContacts( {contacts, changeState} ) {

    const [searchString, setSearchString] = useState("");
    
    const filteredContacts = contacts.filter(contact => {
        return(contact.name.toLowerCase().includes(searchString.toLowerCase()));
    })
    
    return (
        <div className="contactArea">
            <SearchBox 
            searchString = {searchString}
            setSearchString = {setSearchString}
            />
            <ul style = {{listStyleType: "none"}}>
                {filteredContacts.map(contact => {
                    return (
                    <li onClick={(event) => changeState(event, "viewUser", contact.id)}
                    style = {{cursor:"pointer"}}
                    >{contact.name}</li>        
                    )
                })}
            </ul>
        </div>
    );
}