const rs = require('readline-sync');
//Initiate Variables
const gridSize = rs.questionInt('How large should the grid be?');
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
const myShips = 3;
const enemyShips = 3;


//Game
printGrid(enemyGrid, 'True')
printGrid(myGrid)

for(i=1; i<4; i++){
    let x = rs.questionInt(`Enter the X coordinate for ship ${i}:`);
    let y = rs.questionInt(`Enter the Y coordinate for ship${i}:`);
    placeShips(x, y, 'O', myGrid);
}
 
//Functions  

function createGrid(size){
    let grid=[];
    for(let i=0; i < size; i++){
        grid[i] = [];
        for (let j =0; j < size; j++){
            grid[i][j]= '-';
        } 
    }
    return grid;
}

function printGrid(grid, isEnemy= 'False'){
    const headers = createHeaders(grid.length);
    console.log(headers);
    for (i=0; i<grid.length; i++){
        let rowStr = i + ' ';
        for (let cell of grid[1]){
            if (isEnemy && cell == 'O'){
                rowStr += '- '; 
            } else{
                rowStr += cell + ' ';
            }
        }
        console.log(rowStr);
    }
}

function createHeaders(size){
    let result = '  ';
    for(let i=0; i<size; i++){
         result += i + ' ';
    }
    return result;
}

function placeShips(x, y, m, grid){
    grid[y][x] == m;
    printGrid(enemyGrid);
    printGrid(myGrid);
}
