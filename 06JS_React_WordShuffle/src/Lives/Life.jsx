import fullHeart from "./assets/full.png";
import emptyHeart from "./assets/empty.png";

import "./Life.css"

export default function Life( {fullState} ) {

    return (
        <>
        {fullState ?
            <img src={fullHeart} />
            :
            <img src={emptyHeart} />
        }
        </>
    );
}