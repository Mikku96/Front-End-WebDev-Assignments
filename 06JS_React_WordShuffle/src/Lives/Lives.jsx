import Life from "./Life";

export default function Lives( {livesLeft} ) {
    const liveArray = [];
    // Depending on lives left, render full or empty hearts
    for(let index = 0; index <= 2; index++) {
        if (index <= livesLeft) {
            liveArray.push(<Life fullState={true} />);
            continue;
        }
        liveArray.push(<Life fullState={false}/>);
    }

    return (
        <>
            {liveArray}
        </>
    );
}