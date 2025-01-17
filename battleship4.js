const rs = require("readline-sync");
//Initiate Variables
const gridSize = 10;
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
let myScore = 0;
let enemyScore = 0;
let playFlag;
if (rs.keyIn("Press Any Button to Begin")) {
  playFlag = true;
} else {
  playFlag = false;
}
let coordKey = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
};

let myShips = [
  (ship1 = {
    size: 2,
    coordinates: [],
  }),
  (ship2 = {
    size: 3,
    coordinates: [],
  }),
  (ship3 = {
    size: 3,
    coordinates: [],
  }),
  (ship4 = {
    size: 4,
    coordinates: [],
  }),
  (ship5 = {
    size: 5,
    coordinates: [],
  }),
];
let enemyShips = [
  (ship1 = {
    size: 2,
    coordinates: [],
  }),
  (ship2 = {
    size: 2,
    coordinates: [],
  }),
  (ship3 = {
    size: 3,
    coordinates: [],
  }),
  (ship4 = {
    size: 4,
    coordinates: [],
  }),
  (ship5 = {
    size: 5,
    coordinates: [],
  }),
];

let myFire = [];
let enemyFire = [];
//Functions

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createGrid(size) {
  //Creates main Board
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = "-";
    }
  }
  return grid;
}

function printGrid(grid, isEnemy = false) {
  //Prints playable Board with headers
  if (isEnemy) {
    console.log("Enemy Grid!:");
  } else {
    console.log("Your Grid!:");
  }
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (i = 0; i < grid.length; i++) {
    let rowStr = i + " ";
    for (let j = 0; j < grid.length; j++) {
      const cell = grid[i][j];
      if (isEnemy && cell == "O") {
        rowStr += "- ";
      } else {
        rowStr += cell + " ";
      }
    }
    console.log(rowStr);
  }
}

function createHeaders(size) {
  //adds the headers to rows and columns
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result += getLetter(coordKey, i) + " ";
  }
  return result;
}

function attack(x, y, fireList, grid, isEnemy = false) {
  if (grid[y][x] == "M" || grid[y][x] == "!") {
    console.log("Already Fired Here!");
  } else if (grid[y][x] == "O") {
    console.log("Hit!");
    grid[y][x] = "!";
    fireList.push(`${x}-${y}`);
    if (!isEnemy) {
      myScore++;
    } else {
      enemyScore++;
    }
  } else {
    grid[y][x] = "M";
    console.log("Miss!");
  }
}

function winCheck() {
  if (myScore == 16 || enemyScore == 16) {
    return true;
  }
}
//Ship Placement

function randLocation(grid, max, ship) {
  let didPlace = false;
  let directionString;

  while (!didPlace) {
    let x = randInt(max);
    let y = randInt(max);

    [directionString] = randomDirection();
    if (shipCheck(directionString, x, y, ship, grid)) {
      placeShip(x, y, "O", grid, directionString, ship);
      didPlace = true;
    }
  }
}

function randomDirection() {
  let direction = Math.floor(Math.random() * 4) + 1;
  let directionString = "";

  if (direction === 1) {
    //Right
    `        for(let i=0; i>ship.size; i++){
            if(
                column + i >= this.grid.length ||
                this.grid[row][column + i] === m ||
                this.grid[row][column + i] === undefined
            )
            {return [directionString];}
        } `;
    valid = true;
    directionString = "right";
    return [directionString];
  } else if (direction === 2) {
    //Left
    `  for(let i=0; i>ship.size; i++){
           if(
                column - i < 0 ||
                this.grid[row][column - i] === m ||
                this.grid[row][column - i] === undefined
            ){return [directionString];}
            
        } `;
    directionString = "left";
    return [directionString];
  } else if (direction === 3) {
    //up
    ` for(let i=0; i>ship.size; i++){
            if(
                row + i > max ||
                this.grid[row+i][column] === m ||
                this.grid[row+i][column] === undefined
            )
            {return [directionString];}
        } `;
    directionString = "up";
    return [directionString];
  } else if (direction === 4) {
    //down
    `for(let i=0; i>ship.size; i++){
            if(
                row - i < 0 ||
                this.grid[row-i][column] === m ||
                this.grid[row-i][column] === undefined
            )
            {return  [directionString];}
        } `;
    directionString = "down";
    return [directionString];
  }
}

function placeShip(x, y, m, grid, direction, ship) {
  if (direction === "right") {
    for (let i = 0; i < ship.size; i++) {
      grid[y][x + i] = m;

      ship.coordinates.push(`${x + i}-${y}`);
    }
  } else if (direction == "left") {
    for (let i = 0; i < ship.size; i++) {
      grid[y][x - i] = m;

      ship.coordinates.push(`${x + i}-${y}`);
    }
  } else if (direction == "up") {
    for (let i = 0; i < ship.size; i++) {
      grid[y - i][x] = m;

      ship.coordinates.push(`${x + i}-${y}`);
    }
  } else if (direction == "down") {
    for (let i = 0; i < ship.size; i++) {
      grid[y + i][x] = m;

      ship.coordinates.push(`${x + i}-${y}`);
    }
  }
}

function shipCheck(direction, x, y, ship) {
  if (direction === "down") {
    for (let i = 0; i > ship.size; i++) {
      if (
        y + i > gridSize ||
        grid[y + i][x] === m ||
        grid[y + i][x] === undefined
      ) {
        return false;
      }
    }
    y + ship.size < gridSize - 1 ? true : false;
  } else if (direction == "up") {
    for (let i = 0; i > ship.size; i++) {
      if (y - i < 0 || grid[y - i][x] === m || grid[y - i][x] === undefined) {
        return false;
      }
    }
    return y - ship.size > 0 ? true : false;
  } else if (direction == "left") {
    for (let i = 0; i > ship.size; i++) {
      if (x - i < 0 || grid[y][x - i] === m || grid[y][x - i] === undefined) {
        return false;
      }
    }
    return x - ship.size > 0 ? true : false;
  } else if (direction == "right") {
    for (let i = 0; i > ship.size; i++) {
      if (
        x + i >= gridSize ||
        grid[y][x + i] === m ||
        grid[y][x + i] === undefined
      ) {
        return false;
      }
    }
    return x + ship.size < gridSize - 1 ? true : false;
  }
}

function getLetter(obj, val) {
  return Object.keys(obj).find((key) => obj[key] === val);
}

function getCoords() {
  let valid = false;
  while (!valid) {
    let coordStr = rs.question(`Enter the coordinate for attack:(eg: A1)`);

    let coordsArr = [];
    coordsArr = coordStr.split("");
    let xCoord = coordsArr[0].toUpperCase();

    let x = coordKey[`${xCoord}`];
    let y = coordsArr[1];
    if (
      y > gridSize - 1 ||
      x > gridSize - 1 ||
      xCoord in coordKey == false ||
      coordsArr.length != 2
    ) {
      console.log("That's out of bounds!");
      valid = false;
    } else {
      valid = true;
      console.log(x, y);
      return [x, y];
    }
  }
}
//Game
function playGame() {
  const myGrid = createGrid(gridSize);
  const enemyGrid = createGrid(gridSize);
  for (i = 0; i < myShips.length; i++) {
    //Place USER ships
    randLocation(myGrid, gridSize, myShips[i]);
    //Place CPU Ships
    randLocation(enemyGrid, gridSize, enemyShips[i]);
  }
  printGrid(myGrid);
  printGrid(enemyGrid, true);
  while (playFlag) {
    while (!winCheck()) {
      //user turn
      [x, y] = getCoords();

      attack(x, y, myFire, enemyGrid);
      printGrid(enemyGrid, true);

      //CPU turn
      console.log("My Turn!");
      attack(randInt(gridSize), randInt(gridSize), enemyFire, myGrid, true);
      printGrid(myGrid);
    }

    //Confirm Winner
    if (myScore == 16) {
      console.log("You Sank My Battleships!");
      playFlag = false;
    }
    if (enemyScore == 16) {
      console.log("I Sank Your Battleships!");
      playFlag = false;
    }
  }
  //Asks To Restart Game
  if (
    rs.keyInYN(
      "You have destroyed all battleships. Would you like to play again? Y/N"
    )
  ) {
    playFlag = true;
    myScore = 0;
    enemyScore = 0;
    fireList = [];
    playGame();
  } else {
    playFlag = false;
  }
}

playGame();
