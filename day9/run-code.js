const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');

let indexNum = 1;
let isSkipped = false;
let isInGarbage = false;
let garbageChars = 0;
const result = input.split('').reduce((prev, curr, index) => {
  if (isSkipped) {
    isSkipped = false;
    return prev;
  }
  if (curr === '!') {
    isSkipped = true;
    return prev;
  }
  if (curr === '<') {
    isInGarbage = true;
    return prev;
  }
  if (isInGarbage && curr === '>') {
    isInGarbage = false;
    return prev;
  }
  if (isInGarbage) {
    garbageChars++;
    return prev;
  }
  if (curr === '{') {
    prev += indexNum;
    indexNum++;
    return prev;
  }
  if (curr === '}') {
    indexNum--;
    return prev;
  }
  return prev;
}, 0);
console.log('ADDITION RESULT', result);
console.log('GARBAGE CHARS', garbageChars);