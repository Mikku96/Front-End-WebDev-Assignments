import "./styleButton.css";

export default function Button( {singleButton, buttonFunction} ) {
    const classes = "testButton " + singleButton.buttonID;
    // Button can hold multiple functions, buttonFunction
    // The buttonID CAN function as a class, as different buttons "could" look different
    return (
        <>
        {singleButton.visible ? 
            <button className={classes} onClick={(event) => buttonFunction(event, singleButton.buttonID)}>{singleButton.buttonLetter}</button>
            :
            <>{/* If button has been disabled, we do not render a button */}</>
            }
        </>
    );
}


