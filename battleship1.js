const rs = require('readline-sync');
//Initiate Variables
const gridSize = rs.questionInt('How large should the grid be?');
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
let myScore =0;
let enemyScore = 0;

let myShips = [
    ship1 = {
        size:2,
        coordinates: []
    },
    ship2 = {
        size:2,
        coordinates: []
    },
    ship3 = {
        size:3,
        coordinates: []
    },
    ship4 = {
        size:5,
        coordinates: []
    },
]
let enemyShips = [
    ship1 = {
        size:2,
        coordinates: []
    },
    ship2 = {
        size:2,
        coordinates: []
    },
    ship3 = {
        size:3,
        coordinates: []
    },
    ship4 = {
        size:5,
        coordinates: []
    },
]

let myFire= []
let enemyFire =[]
//Functions

function randInt(max){
    return Math.floor(Math.random() * Math.floor(max))
}

function createGrid(size){
    //Creates main Board
    let grid=[];
    for(let i=0; i < size; i++){
        grid[i] = [];
        for (let j =0; j < size; j++){
            grid[i][j]= '-';
        } 
    }
    return grid;
};

function printGrid(grid, isEnemy= false){
    //Prints playable Board with headers
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
};

function createHeaders(size){
    //adds the headers to rows and columns
    let result = '  ';
    for(let i=0; i<size; i++){
         result += i + ' ';
    }
    return result;
};

function attack(x,y,ships,fireList,grid){
    if(myFire.indexOf(`${x}-${y}`) !== -1){
        console.log('Already Fired Here!')
    }else{
        for(let i = 0; i<ships.length; i++){
            if(ships[i].coordinates.indexOf(`${x}-${y}`) !== -1){
                ships[i].size --;
                console.log('Hit!');
                grid[y][x] = '!';
                fireList.push(`${x}-${y}`);
                break;
            }
        }
        grid[y][x] = 'M';
        console.log('Miss!');
    }

}

function sinkCheck(ships, scoreCounter){
    for(i = 0; i< ships.length; i++){
        if(ships[i].size == 0){
            ships = ships.filter(ship => ship.size=0); //removes ships that have been sunk
            scoreCounter +=1; // Awards a point for sinking a ship
            console.log('You sank a ship!');
        }
    } 
};
function winCheck(){
    if(myScore == 4 || enemyScore == 4){
        return true;
    }
}
    //Ship Placement

function randLocation (grid, max, ship) {
    let didPlace = false;
    let valid = false;
    let directionString;

    while (!didPlace) {
        let x = randInt(max);
        let y = randInt(max);

        [valid, directionString] = randomDirection (x,y,ship, 'O');
        if(valid){
            placeShip(x, y, 'O', grid, directionString, ship);
            didPlace = true;
        }
    }
};

function randomDirection (column, row, ship, m) {
    let valid = false;
    let direction = Math.floor(Math.random()*4)+ 1;
    let directionString = "";

    if (direction === 1) {
        //Right
        for(let i=0; i>ship.size; i++){
            if(
                column + i >= this.grid.length ||
                this.grid[row][column + i] === m ||
                this.grid[row][column + i] === undefined
            )
            return [valid, directionString];
        } 
        valid = true;
        directionString = "right";
        return [valid, directionString];
    } else if (direction === 2) {
        //Left
        for(let i=0; i>ship.size; i++){
            if(
                column - i < 0 ||
                this.grid[row][column - i] === m ||
                this.grid[row][column - i] === undefined
            )
            return [valid, directionString];
        } 
        valid = true;
        directionString = "left";
        return [valid, directionString];

    } else if (direction === 3) {
        //Left
        for(let i=0; i>ship.size; i++){
            if(
                row + i > max ||
                this.grid[row+i][column] === m ||
                this.grid[row+i][column] === undefined
            )
            return [valid, directionString];
        } 
        valid = true;
        directionString = "up";
        return [valid, directionString];
    } else if (direction === 4) {
        //Left
        for(let i=0; i>ship.size; i++){
            if(
                row - i < 0 ||
                this.grid[row-i][column] === m ||
                this.grid[row-i][column] === undefined
            )
            return [valid, directionString];
        } 
        valid = true;
        directionString = "down";
        return [valid, directionString];

    }
};

function placeShip(x, y, m, grid, direction, ship) {
    if(direction === "right") {
        for(let i=0; i < ship.size; i++){
            grid[y][x+i] = m;

            ship.coordinates.push(`${x+i}-${y}`); 
        }
    } else if(direction == "left"){
        for(let i=0; i < ship.size; i++){
            grid[y][x-i] = m;

            ship.coordinates.push(`${x+i}-${y}`); 
        }
    }  else if(direction == "up"){
        for(let i=0; i < ship.size; i++){
            grid[y-i][x] = m;

            ship.coordinates.push(`${x+i}-${y}`); 
        }
    }  else if(direction == "down"){
        for(let i=0; i < ship.size; i++){
            grid[y+i][x] = m;

            ship.coordinates.push(`${x+i}-${y}`); 
        }
    } 
};


        
//Game

let playFlag = true

while(playFlag){
    for(i = 0; i< 4; i++){
        for(let j=0; j<myShips.length; j++){  //Place USER ships
            randLocation(myGrid, gridSize, myShips[j])
          }
          for(let j=0; j<enemyShips.length; j++){ //Place CPU Ships
            randLocation(enemyGrid, gridSize, enemyShips[j])
          }
    };
    printGrid(myGrid);
    printGrid(enemyGrid, true);

    while(!winCheck(myShips) && !winCheck(enemyShips)){
        //user turn
        let x = rs.questionInt(`Enter the X coordinate for attack:`);
        let y = rs.questionInt(`Enter the Y coordinate for attack:`);
        attack(x,y,enemyShips,myFire, enemyGrid);
        sinkCheck(enemyShips, myScore)
        printGrid(enemyGrid, true);
        
        //CPU turn
        console.log('My Turn!');
        attack(randInt(gridSize),randInt(gridSize),myShips, enemyFire, myGrid);
        sinkCheck(myShips, enemyScore)
        printGrid(myGrid);
    };

    //Confirm Winner
    if(myScore == 4){
        console.log('You Sank My Battleships!')
    }
    if(enemyScore == 4){
        console.log('I Sank Your Battleships!')
    }
    
    //Asks To Restart Game
    if(rs.keyInYN('Do you want to play again? Y/N')){
        playFlag = true
    } else{
        playFlag = false
    }
};
