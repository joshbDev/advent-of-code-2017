const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
console.log(inputArray.length)
const answer = inputArray.reduce((prev, curr) => {
  const passPhraseArray = curr.split(' ');
  let hasDupe = false;
  passPhraseArray.forEach((item, index) => {
    const restOfArray = passPhraseArray.slice(index + 1);
    if (restOfArray.includes(item)) {
      hasDupe = true;
    }
  });
  if (hasDupe) {
    prev--;
  }
  return prev;
}, inputArray.length);
console.log(answer);