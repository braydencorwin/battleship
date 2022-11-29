const rs = require('readline-sync');
//Initiate Variables
const gridSize = rs.questionInt('How large should the grid be?');
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
const myShips = 3;
const enemyShips = 3;
let enemyLocations = {}


//Game
printGrid(enemyGrid, true)
printGrid(myGrid)

for(let i=1; i<4; i++){
    let x = rs.questionInt(`Enter the X coordinate for ship ${i}:`);
    let y = rs.questionInt(`Enter the Y coordinate for ship${i}:`);
    placeShips(x, y, 'O', myGrid);
    placeEnemy('-');
    printGrid(myGrid);
    printGrid(enemyGrid);
}

while(myShips>0 && enemyShips>0){
    let x = rs.questionInt(`Enter the X coordinate for attack:`);
    let y = rs.questionInt(`Enter the Y coordinate for attack:`);
    attack(x, y, enemyGrid)
    attack(randInt(max), randInt(max), myGrid)

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

function printGrid(grid, isEnemy= false){
    const headers = createHeaders(grid.length);
    console.log(headers);
    for (i=0; i<grid.length; i++){
        let rowStr = i + ' ';
        for (let j = 0; j < grid.length; j++){
            const cell = grid[i][j];
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
    grid[y][x] = m;
}

function attack(x, y, grid){
    if(grid[y][x]=='O'){
        console.log('Hit!');
        grid[y][x] = '!'
        enemyShips--;
    } else{
        grid[y][x]='X';
        console.log('Miss!')
    }
}

function placeEnemy(m, grid, max){
    let didPlace = false;
    while(!didPlace){
        let x = randInt(max);  
        let y = randInt(max); 
        if(!enemyLocations[`${x}-${y}`]){
            placeShips(x, y, m, grid);
            didPlace = true;
            enemyLocations[`${x}-${y}`] = true;
        }
    }
}
 
function randInt(max){
    return Math.floor(Math.random() * Math.floor(max))
}

function attack(x, y, grid){
    if(enemyLocations[`${x}-${y}`]){
        grid[y][x]='!';
        enemyShips--;
        console.log('Hit!');
    } else{
        grid[y][x] ='X';
        console.log('Miss!');
    }

}