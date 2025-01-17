const rs = require('readline-sync');    

//Initiate Variables
let gridSize = 3
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
let fireList = [];
let myScore = 0;
let enemyScore = 0;
let playFlag;
if(rs.keyIn('Press Any Button to Begin')){
    playFlag = true
} else{
    playFlag = false
};

let coordKey = {
    A : 0,
    B : 1,
    C : 2,
    D : 3,
    E : 4,
    F : 5,
    G : 6,
    H : 7, 
    I : 8,
    J : 9,
};

//Functions

function randInt(max){
    return Math.floor(Math.random() * Math.floor(max))
};

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

function attack(x,y,grid){
    if(fireList.indexOf(`${x}-${y}`) !== -1){
        console.log('Already Fired Here!')
    }else if(grid[y][x] === 'O'){
            grid[y][x] = 'O';
            fireList.push(`${x}-${y}`)
            console.log('Hit!');
            myScore++
    }else{
        console.log('Miss')
        fireList.push(`${x}-${y}`)
    };

};

function placeShip(x, y, m, grid) {
    if(grid[y][x] != m){
            grid[y][x] = m
    };
};



function winCheck(){
    if(myScore == 2 || enemyScore == 2){
        return true;
    };
};


function getCoords(){
    let valid = false;
    while(!valid){
        let coordStr = rs.question(`Enter the coordinate for attack:(eg: A1)`);
    
    let coordsArr = [];
    coordsArr = coordStr.split('');
    let xCoord = coordsArr[0].toUpperCase();

    let x = coordKey[`${xCoord}`];
    let y = coordsArr[1];
    if(y > gridSize-1 || x > gridSize-1 || xCoord in coordKey == false ||
        coordsArr.length != 2){
        console.log("That's out of bounds!");
        valid = false;
    } else {
        valid = true
        console.log(x, y)
        return [x,y]
    }
    }
};


//Game


function playGame (){
    const enemyGrid = createGrid(gridSize);
    for(let i = 0; i< 2; i++){
        let x = randInt(gridSize);
        let y = randInt(gridSize);
        placeShip(x, y, 'O', enemyGrid)
    }
    while(playFlag){
        while(!winCheck()){
            //user turn
            [x , y] = getCoords()
            attack(x,y, enemyGrid);
        };

        //Confirm Winner
        if(myScore == 2){
            console.log('You Sank My Battleships!')
            playFlag = false
        };
        if(enemyScore == 4){
            console.log('I Sank Your Battleships!')
        };
        
        //Asks To Restart Game
        
};
    if(rs.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N')){
            playFlag = true
            myScore=0
            fireList = []
            playGame()
        } else{
            playFlag = false
        };
}

playGame()