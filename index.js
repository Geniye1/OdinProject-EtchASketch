function generateGrid(gridSize) {
    // Calculate the cellSize based on the size of the grid so the same amount of space is maintained no matter the amount of cells
    let cellSize = (gridContainerSize / gridSize) - 2;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "grid-cell");
            cell.style.width = cellSize.toString() + "px";
            cell.style.height = cellSize.toString() + "px";

            cell.addEventListener("mouseover", function() {
                //cell.classList.add("grid-cell-filled");
                mouseHoverEvent(cell);
            });

            gridCells.push(cell);
            gridContainer.appendChild(cell);
        }
    }
}

function removeCurrentGrid() {
    gridCells.forEach(cell => {
        cell.parentNode.removeChild(cell);
    })
    gridCells.length = 0;
}

function mouseHoverEvent(cell) {
    if (solidMonoCheckbox.checked) {
        cell.style.backgroundColor = "black";
    }
    else if (lightMonoCheckbox.checked) {
        let currentColor = getComputedStyle(cell).getPropertyValue("background-color");
        let currentAlpha = parseFloat(currentColor.split(",")[3].substring(1).slice(0, -1));
        currentAlpha += 0.1;
        cell.style.backgroundColor = "rgba(0, 0, 0, " + currentAlpha.toString() + ")";
    }
    else if (randomRGBCheckbox.checked) {
        let r = Math.floor(Math.random()  * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        cell.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    }
    else {
        cell.style.backgroundColor = "black";
    }
}

const gridContainer = document.querySelector(".grid-container");
const gridContainerSize = parseInt(getComputedStyle(gridContainer).getPropertyValue("width")); // getComputedStyle().width returns '960px', for some reason parseInt discards the px suffix. i have no idea why.
const gridCells = [];

const changeSizeButton = document.querySelector(".change-grid-button");
changeSizeButton.addEventListener("click", function() {
    let userInput = prompt("How big do you want the grid to be? (Between 16 and 100 only)");
    if (userInput > 100 || userInput < 16) {
        alert("What the hell did I just say");
        return;
    }
    removeCurrentGrid();
    generateGrid(userInput);
})

const solidMonoCheckbox = document.querySelector("input[data-type=solid-mono]");
const lightMonoCheckbox = document.querySelector("input[data-type=light-mono]");
const randomRGBCheckbox = document.querySelector("input[data-type=random-color]");

// Entry point
generateGrid(16);

