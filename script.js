// createCell creates one 'cell' div inside of the "grid" div
function createCell(number) {

    let newCell = document.createElement('div');
    newCell.id = number;
    newCell.classList.add('cell');
    newCell.classList.add('brightness-0');
    newCell.setAttribute('style', 'border: 1px solid gray; background-color: white');
    const grid = document.querySelector('#fieldGrid');
    grid.appendChild(newCell);
}

// resize sets properties of 'grid' div and fill it with new cells created by func "createCell"

function resize(size = 16) {

    if (size > 99 || size < 1) {
        return alert('Wrong size')
    }

    if (typeof (size) != "number") {
        return alert(`It must be a number!`)
    }

    const grid = document.querySelector('#fieldGrid');

    grid.setAttribute('style', `display: grid; grid-template-rows: repeat(${size}, auto); 
        grid-template-columns: repeat(${size}, auto)`);

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < size * size; i++) {
        createCell(i);
    }
    

}

// resize button now asks the size of the field and do resize
const resetBtn = document.querySelector('#fieldBtn');
resetBtn.addEventListener('click', () => {
        resize(Number(prompt('Pick a field size. It must be from 1 to 99 cells.')));
    }
);

// This creates the first field
resize();

// clearBtn sets colors of all cells to default value
const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
        cell.style.filter = '';
    })
})

// This applies 'randomen' func listener to all cells
function randomColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', randomen)
    })
}

// This creates a random color and applies it to 'this'
function randomen () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

// Firstly it removes all the listeners from the field, so you will not able to paint black and random color at the same time.
// Secondly it turn on the 'random brush'
const randomBtn = document.querySelector('#randomClr');
randomBtn.addEventListener('click',stopListen);
randomBtn.addEventListener('click',randomColor);

// This applies 'blacken' func listener to all cells
function blackColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', blacken)
    })
}

// This creates a black color and applies it to 'this'
function blacken () {
    this.style.backgroundColor = 'black';
}

// Firstly it removes all the listeners from the field, so you will not able to paint black and random color at the same time.
// Secondly it turn on the 'black brush'
const blackBtn = document.querySelector('#blackClr');
blackBtn.addEventListener('click',stopListen);
blackBtn.addEventListener('click',blackColor);

// This applies 'brighten' func listener to all cells
function grayColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter',brighten);
    })
}

// This set 'filter: brightness(XX%)' of the sell. It checks existing filter and changhes it if it's needed.
function brighten() {
    if (this.style.filter == '') {
        this.style.filter = "brightness(90%)";
    } else if (this.style.filter == "brightness(10%)" || 
    this.style.filter == "brightness(0%)") {
        this.style.filter = "brightness(0%)";
    } else {
        let arrayBright = this.style.filter.split('');
        let posBright = arrayBright.indexOf('%')-2;
        let brightness = Number(arrayBright[posBright]);
        this.style.filter = `brightness(${brightness-1}0%)`;
    }
    
}

// Firstly it removes all the listeners from the field, so you will not able to paint black and random color at the same time.
// Secondly it turn on the 'dark brush'
const grayBtn = document.querySelector('#grayClr');
grayBtn.addEventListener('click',stopListen);
grayBtn.addEventListener('click',grayColor);

// Function which remove all listeners from the sells, so listeners cannot overlap each other
function stopListen() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach( (cell) => {
        cell.removeEventListener('mouseenter',blacken);
        cell.removeEventListener('mouseenter',randomen);
        cell.removeEventListener('mouseenter',brighten);
    })
}
