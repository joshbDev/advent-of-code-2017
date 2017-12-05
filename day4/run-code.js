const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
let anagramNumber = Number(inputArray.length);
const answer = inputArray.reduce((prev, curr) => {
  const passPhraseArray = curr.split(' ');
  let hasDupe = false;
  let hasAnagram = false;
  passPhraseArray.forEach((item, index) => {
    const restOfArray = passPhraseArray.slice(index + 1);
    if (restOfArray.includes(item)) {
      hasDupe = true;
    }
    restOfArray.forEach((compareItem) => {
      if (compareItem.length !== item.length) {
        return;
      }
      if (compareItem.split('').sort().join('') === item.split('').sort().join('')) {
        hasAnagram = true;
      }
    });
  });
  if (hasDupe) {
    prev--;
  }
  if (hasAnagram) {
    anagramNumber--;
  }
  return prev;
}, inputArray.length);
console.log('DUPLICATE ANSWER', answer);
console.log('ANAGRAM ANSWER', anagramNumber);