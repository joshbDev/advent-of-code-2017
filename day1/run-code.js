const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('');
const inputArrayCleaned = inputArray.map((item) => {
  return Number(item);
})
const allSum = inputArrayCleaned.reduce((prev, curr, index) => {
  console.log(prev);
  const prevInput = inputArrayCleaned[index - 1];
  if (!prevInput || !curr || isNaN(curr)) {
    return prev;
  }
  if ((index === inputArrayCleaned.length - 1) && curr === inputArrayCleaned[0]) {
    return prev + curr;
  }
  if (curr === prevInput) {
    return prev + curr;
  }
  return prev;
}, 0);
console.log(allSum);