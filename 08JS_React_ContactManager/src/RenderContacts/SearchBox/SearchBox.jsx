import "./styleSearchBox.css";

export default function SearchBox ({searchString, setSearchString}) {
    return (
        <input className="searchBox" type="text" placeholder="Search" value={searchString}
        onChange={(event) => setSearchString(event.target.value)}/>
    );
}