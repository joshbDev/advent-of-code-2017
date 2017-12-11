const fs = require('fs');

const input = fs.readFileSync('./input').toString('utf-8').trim();

const directionSplit = input.split(',');

const oppositDirections = [['s', 'n'], ['se', 'nw'], ['sw', 'ne']];

const total = directionSplit.reduce((prev, curr) => {
 if(typeof prev[curr] === 'undefined') {
   prev[curr] = 0;
 } else {
   prev[curr]++
 }
 return prev;
}, {});

const minusedTotal = oppositDirections.reduce((prev, curr) => {
  const [one, two] = curr;
  if (total[one] >= total[two]) {
    prev[one] = total[one] - total[two];
    return prev;
  }
  prev[two] = total[two] - total[one];
  return prev;
}, {});

let otherNumber = 0
const finalSteps = Object.keys(minusedTotal).reduce((prev, curr) => {
  if (curr.length === 1) { //this is either straight north or south and can be added regardless
    prev += minusedTotal[curr];
    return prev;
  }
  if (!otherNumber) {
    otherNumber = minusedTotal[curr];
    prev += otherNumber;
  } else {
    prev += minusedTotal[curr] - otherNumber;
  }
  return prev;
}, 0);

console.log(finalSteps);