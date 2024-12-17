import { useState } from 'react';

import "./styleContactForm.css";

import InputBox from  "./InputBox/InputBox";

export default function ContactForm( {handleContactList, changeState} ) {

    const [newUser, setUser] = useState({
        name: "", email: "", phone: "",
            address: "", website: "", notes:""
    });

    const [submitEnabled, setSubmitEnabled] = useState(true);

    function beforeSend(event) {
        event.preventDefault();
        handleContactList(newUser);
        setUser({name: "", email: "", phone: "", address: "", website: "", notes: ""});
        changeState("","welcome");
        setSubmitEnabled(true);
    }

    function setterHandler (event) {
        const objectKey  = event.target.name;
        const newKeyvalue = event.target.value;

        setUser({...newUser, [objectKey]: newKeyvalue});

        if (objectKey === "name" && newKeyvalue !== "") {
            setSubmitEnabled(false);
            return;
        } else if (objectKey !== "name" &&  newUser.name !== "") {
            setSubmitEnabled(false);
            return;
        } else {
            setSubmitEnabled(true);
        }
    }

    function resetCall(event) {
        event.preventDefault();
        changeState(event,"welcome");
    }
    // BELOW! Inputboxes could be in a map...
    // Would need another array for the header names
    // But otherwise, they are quite similar
    return (
        <div className="contactArea">
            <form onSubmit={(event) => beforeSend(event)} onReset={resetCall}>
                <InputBox 
                header = {"Name"}
                objectKey = "name"
                boxContent = {newUser.name}
                setterHandler = {setterHandler}
                />
                <InputBox 
                header = {"Email address"}
                objectKey = "email"
                boxContent = {newUser.email}
                setterHandler = {setterHandler}
                />
                <InputBox 
                header = {"Phone number"}
                objectKey = "phone"
                boxContent = {newUser.phone}
                setterHandler = {setterHandler}
                />
                <InputBox 
                header = {"Address"}
                objectKey = "address"
                boxContent = {newUser.address}
                setterHandler = {setterHandler}
                />
                <InputBox 
                header = {"Website"}
                objectKey = "website"
                boxContent = {newUser.website}
                setterHandler = {setterHandler}
                />
                <h3>Notes</h3>
                <textarea value={newUser.notes} name='notes' onChange={setterHandler} rows="3"/>
                <div className="formButtons">
                    <button type="submit" disabled={submitEnabled}>Save</button>
                    <input value="Cancel" type="reset"/>
                </div>
            </form>
            
        </div>
    );
}