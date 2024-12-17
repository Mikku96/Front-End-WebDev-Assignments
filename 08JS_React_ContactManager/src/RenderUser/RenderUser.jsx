import "./styleRenderUser.css";

export default function RenderUser( {contact, handleRemove, changeState} ) {

    // Only other than ID, name and empty fields are rendered
    const filteredContact = Object.entries(...contact)
    .filter(([key, item]) => {
        return (key !== "id" && key !== "name" && item !== "")
    })
    .map(([key, value]) => (
        <li>
            <em>{key.charAt(0).toUpperCase() + key.slice(1)}</em>: {value}
        </li>
    ));

    return (
        <div className="displayedUser">
            <h1>{contact[0].name}</h1>
            <ul style = {{listStyleType: "none"}}>
                {filteredContact}
            </ul>
            <button onClick={(event) => handleRemove(event, contact[0].id)}>Remove</button>
            <button onClick={(event) => changeState(event, "welcome")}>Return</button>
        </div>
    );
}