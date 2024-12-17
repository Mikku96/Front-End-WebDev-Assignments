const currentColor = {color: "#000000"}; // Holds the chosen color
const switches = {}; // Holds the squares
const buttons = {}; // Holds color buttons

class SquareLogic {
    constructor(xCoord, yCoord) {
        this.squareDiv = document.createElement("div"); // Construct divs for each square
        this.squareDiv.setAttribute("id", `switch_${xCoord}_${yCoord}`);
        this.squareDiv.style.backgroundColor = "#ffffff"; // White
        this.squareDiv.style.borderStyle = "solid";

        board.appendChild(this.squareDiv); // The squares are children of the board

        this.onClick = this.onClick.bind(this); // Gives ability to use "this"; could just refer to event!
        this.squareDiv.addEventListener("click", this.onClick, false); // Event set
    }
    onClick(event) {
        let rgb = currentColor.color; // Different tools use different setup... MAKE SURE that we have rgb
        if (currentColor.color.includes("rgb") === false) {
            const hex = currentColor.color.substring(1); // Googled how to change HEX to RGB
            const red = hex.substring(0, 2); // Basically, we take substrings
            const green = hex.substring(2, 4);
            const blue = hex.substring(4);
            rgb = `rgb(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)})`;
        }

        if (this.squareDiv.style.backgroundColor === rgb) { // If same color is being used
            this.squareDiv.style.backgroundColor = "#ffffff"; // Set to white
            return;
        }
        this.squareDiv.style.backgroundColor = currentColor.color; // Otherwise, color is the chosen one
    }
}

class ColorButtons {
    constructor (color) {
    this.color = color;

    this.htmlButton = document.createElement("div"); // For each button
    this.htmlButton.setAttribute("id", `${this.color}`); // Own div and attribute
    this.htmlButton.style.backgroundColor = this.color; 
    this.htmlButton.style.height = "30px";
    this.htmlButton.style.width = "30px";
    this.htmlButton.style["border-style"] = "solid";
    this.htmlButton.style["border-color"] = "white";
    this.htmlButton.style["border-width"] = "3px";
    this.htmlButton.style["border-radius"] = "50%";

    buttonsHTML.appendChild(this.htmlButton); // Add to parent 

    this.htmlButton.addEventListener("click", this.changeColorButton, false); // Set the event
    }
    changeColorButton(event) { 
        currentColor.color = event.currentTarget.id; // The id tells us the color to change to
        Object.keys(buttons).forEach(key => {
            buttons[key].htmlButton.style["border-width"] = "3px"; // All borders return to normal
        });
        event.currentTarget.style["border-width"] = "5px"; // The chosen one gets larger borders
    }
}


function changeColor(event) { // For color picker
    currentColor.color = event.target.value; // Change the color in our holder
    Object.keys(buttons).forEach(key => {
        buttons[key].htmlButton.style["border-width"] = "3px"; // Reduce the borders of other tool
    });
}

//##################################
//####GENERATING HTML COMPONENTS####
//##################################

 // Parent of everything
const content = document.getElementById("content");
content.style["display"] = "grid";
content.style["grid-template-columns"] = "600px 50px"; //600px for grid, 50px for colors
content.style["column-gap"] = "15px";


 // Parent to hold all color stuff (the tool and the extra assignment buttons)
const colorPics = document.createElement("div");
colorPics.style["display"] = "grid"; // It will hold the tool itself,
colorPics.style["grid-template-rows"] = "repeat(5, 1fr)"; // and color buttons (later)
colorPics.style["height"] = "400px";

// Generate color picker tool (EXTRA EXTRA)
// The child is the actual tool
const pickerInput = document.createElement("input");
pickerInput.setAttribute("type", "color");
pickerInput.setAttribute("value", "#000000"); // Start color is black
pickerInput.setAttribute("id", "color-picker");
pickerInput.addEventListener("input", changeColor, false); // Event set
colorPics.appendChild(pickerInput); // The tool is set to parent


// Generate color buttons (EXTRA)
const buttonsHTML = document.createElement("div"); // Parent for buttons
buttonsHTML.setAttribute("id", "buttonParent");
buttonsHTML.style.display = "grid";
buttonsHTML.style["row-gap"] = "5px";

for (let button of ["#ff0000", "#008000", "#0000ff", "#000000", "#fff365"]) { // By adding to array, add new buttons
    buttons[button] = new ColorButtons(button); // Within here, all buttons added to parent "buttonsHTML"
}
colorPics.appendChild(buttonsHTML); // Append buttons to the color picker grid


// Generate the grid parent
const board = document.createElement("div");
board.style["display"] = "grid";
board.style["grid-template-columns"] = "repeat(10, 1fr)"; // 10 col
board.style["grid-template-rows"] = "repeat(10, 1fr)"; // 10 rows
board.style["border-color"] = "black";
board.style["background-color"] = "rgb(0,255,0)"; // GREEN background (testing)
board.style["border-style"] = "solid";
board.style["width"] = "600px"; // 600px size
board.style["height"] = "600px";

// Generate grid squares
for (let i = 0; i <= 9; i++) {  // y coordinate (row)
    for (let j = 0; j <= 9; j++) {  // x coordinate (column)
        switches[`switch_${j}_${i}`] = new SquareLogic(j, i); 
    }
}


// At the end, append all to the main parent "content"
content.appendChild(board);
content.appendChild(colorPics);