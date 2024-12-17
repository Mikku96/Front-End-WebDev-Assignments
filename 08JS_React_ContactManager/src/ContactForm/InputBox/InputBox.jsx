export default function InputBox ( {header,objectKey, boxContent, setterHandler} ) {
    return (
        <>
            <h3>{header}</h3>
            <input type="text" value={boxContent} name={objectKey} onChange={(event) => setterHandler(event)}/>
        </>
    );
}