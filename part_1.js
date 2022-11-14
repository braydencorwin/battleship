var rs = require('readline-sync')

const board = ['A1',' B1',' C1',
'A2', 'B2', 'C2',
'A3', 'B3', 'C3'];

console.log(board)

const shipPlacement = [];
let hitCount = 0;
let winFlag = 'False'

const shipPlacer = function(board){
    let i = Math.floor(Math.random() * board.length());
    shipPlacement.append(board[i]);
};

while (winFlag = 'False'){
    const fire = function(){
    var fired = rs.keyInSelect(board, 'Where would you like to fire?')
    let index = board.findIndex(x => x === fired);
    board.slice[index];
    if (fired in shipPlacement){
        console.log('HIT!')
        hitCount +=1
        }
    }

const winCheck = function(counter) {
    if (counter = 2){
        console.log('You sank my battleships!')
        let winFlag = 'True'
    } else {
        let winFlag = 'False'
        }
    }   
}
console.log(board);




