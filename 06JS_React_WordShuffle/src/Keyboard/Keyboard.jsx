import Button from "../Button/Button";

import "./styleKeyboard.css";

export default function Keyboard( {buttonArray, removeButton}) {

    return (
        <>
        {buttonArray.map(singleButton => (
            <Button
            singleButton = {singleButton}
            buttonFunction = {removeButton}
            key = {singleButton.buttonID}
            />
        ))}
        </>
    )
}

