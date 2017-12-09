const fs = require('fs');
const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
const inputArrayCleaned = inputArray.map(item => Number(item));
let howManyMoves = 0;
let currPosition = 0;
function runFunction(checkIndex) {
  const checkingIndex = inputArrayCleaned[checkIndex];
  currPosition = currPosition + checkingIndex;
  if (inputArrayCleaned[checkIndex] < 3) {
    inputArrayCleaned[checkIndex] = inputArrayCleaned[checkIndex] + 1;
  } else if (inputArrayCleaned[checkIndex] >= 3) {
    inputArrayCleaned[checkIndex] = inputArrayCleaned[checkIndex] - 1;
  }
  howManyMoves++;
}
while(typeof inputArrayCleaned[currPosition] !== 'undefined') {
  runFunction(currPosition);
}
console.log(howManyMoves);