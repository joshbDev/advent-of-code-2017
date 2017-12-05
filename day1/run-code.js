const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('');
const inputArrayCleaned = inputArray.map((item) => {
  return Number(item);
})


const allSum = inputArrayCleaned.reduce((prev, curr, index) => {
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

function sumCircularOpposites(list) {
  let sum = 0;
  for(let i=0; i<(list.length/2); i++) {
    const first = list[i];
    const second = list[i + list.length/2];
    if(first === second) sum += (first * 2);
  }
  return sum;
}

console.log('SECOND PART ANSWER', sumCircularOpposites(inputArrayCleaned));