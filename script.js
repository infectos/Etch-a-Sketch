function createCell(number) {

    let newCell = document.createElement('div');
    newCell.id = number;
    newCell.classList.add('cell');
    newCell.classList.add('brightness-0');
    newCell.setAttribute('style', 'border: 1px solid gray; background-color: white');
    const grid = document.querySelector('#fieldGrid');
    grid.appendChild(newCell);
}

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

const resetBtn = document.querySelector('#fieldBtn');
resetBtn.addEventListener('click', () => {
        resize(Number(prompt('Pick a field size. It must be from 1 to 99 cells.')));
    }

);

resize();

const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
        cell.style.filter = '';
    })
})


function randomColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {

        cell.addEventListener('mouseenter', randomen)
    })
}

function randomen () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

const randomBtn = document.querySelector('#randomClr');
randomBtn.addEventListener('click',stopListen);
randomBtn.addEventListener('click',randomColor);


function blackColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', blacken)
    })
}

function blacken () {
    this.style.backgroundColor = 'black';
}


const blackBtn = document.querySelector('#blackClr');
blackBtn.addEventListener('click',stopListen);
blackBtn.addEventListener('click',blackColor);


function grayColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter',brighten);
    })
}

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


const grayBtn = document.querySelector('#grayClr');
grayBtn.addEventListener('click',stopListen);
grayBtn.addEventListener('click',grayColor);


function stopListen() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach( (cell) => {
        cell.removeEventListener('mouseenter',blacken);
        cell.removeEventListener('mouseenter',randomen);
        cell.removeEventListener('mouseenter',brighten);
    })
}
