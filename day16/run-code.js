const fs = require('fs');
const cloneDeep = (item) => JSON.parse(JSON.stringify(item));
const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split(',');
const PROGRAM_STRING = 'abcdefghijklmnop';
const ONE_BILLION = 1000000000;

const final = doTheDance(inputArray, PROGRAM_STRING);
console.log('ONE', final.join(''));

let answerTwo = PROGRAM_STRING;
for (let x = 0; x < ONE_BILLION; x++) {
  if (x && answerTwo === PROGRAM_STRING) {
    x += (Math.floor(ONE_BILLION / x) - 1) * x;
  } 
  answerTwo = doTheDance(inputArray, answerTwo).join('');

}
console.log('TWO', answerTwo);

function doTheDance(inputArray, initialString) {
  return inputArray.reduce((prev, curr, index) => {

    const typeOfDance = curr.split('')[0];
    const format = curr.split('').slice(1).join('');
    if (typeOfDance === 's') {
      for (let x = 0; x < Number(format); x++) {
        prev = [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
      }
    }
    if (typeOfDance === 'x') {
      const [itemOne, itemTwo] = format.split('/');
      prev = swap(Number(itemOne), Number(itemTwo), prev);
    }
    if (typeOfDance === 'p') {
      const [stringOne, stringTwo] = format.split('/');
      const itemOne = prev.indexOf(stringOne);
      const itemTwo = prev.indexOf(stringTwo);
      prev = swap(itemOne, itemTwo, prev);
    }
    return prev;
  }, initialString.split(''))
}

function swap(indexOne, indexTwo, array) {
  const arrayToSwap = JSON.parse(JSON.stringify(array));
  const itemOneString = arrayToSwap[indexOne];
  const itemTwoString = arrayToSwap[indexTwo];
  arrayToSwap[indexOne] = itemTwoString;
  arrayToSwap[indexTwo] = itemOneString;
  return arrayToSwap;
}