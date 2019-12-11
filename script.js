


function createCell(number) {
    
    let cell = document.createElement('div');
    cell.id = number;
    cell.setAttribute('style', 'border: 1px solid gray');
    const grid = document.querySelector('#fieldGrid');
    grid.appendChild(cell);
}

function resize(size=16) {

    if (size>99 || size<1) {
        return alert('Wrong size')
    }

    if (typeof(size)!= "number") {
        return alert(`It must be a number!`)
    }

    const grid = document.querySelector('#fieldGrid');
    console.log(grid.id);

    grid.setAttribute('style',`display: grid; grid-template-rows: repeat(${size}, auto); 
        grid-template-columns: repeat(${size}, auto)`);
    
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
    for (let i = 0; i < size*size; i++) {
        createCell(i);
    }

}

const resetBtn = document.querySelector('#fieldBtn');
resetBtn.addEventListener ('click', () => {
    resize(Number(prompt('Pick a field size. It must be from 1 to 99 cells.')));
}

);

