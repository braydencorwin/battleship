var rs = require('readline-sync')

const board = ['A1',' B1',' C1',
'A2', 'B2', 'C2',
'A3', 'B3', 'C3'];

console.log(board)

const shipPlacement = [];
let hitCount = 0;
let winFlag = 'False';

const shipPlacer = function(board){
    let i = Math.floor(Math.random()*board.length);
    shipPlacement.push(board[i]);
};

shipPlacer(board);

let fired = rs.question(board, 'Where would you like to fire?')

const fire = function(){
    let index = board.findIndex(x => x === fired);
    board.slice[index];
if (fired in shipPlacement){
    console.log('HIT!')
    hitCount +=1
    } else{
        console.log('Miss')
    }
}

const winCheck = function(counter) {
    if (counter === 2){
        console.log('You sank my battleships!')
        let winFlag = 'True'
    } else {
        let winFlag = 'False'
        }
}   

for (; hitCount<2;) {
    
    fire();
    winCheck(hitCount);
    console.log(hitCount);
}

console.log(board);
