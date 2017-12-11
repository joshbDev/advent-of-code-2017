const fs = require('fs');

const input = fs.readFileSync('./input').toString('utf-8').trim();

const directionSplit = input.split(',');

const oppositDirections = [['s', 'n'], ['se', 'nw'], ['sw', 'ne']];
let farthestAway = 0;

const total = directionSplit.reduce((prev, curr) => {
 if(typeof prev[curr] === 'undefined') {
   prev[curr] = 0;
 } else {
   prev[curr]++
 }
 const howFarAway = calculateHowFarAway(createRubric(oppositDirections, prev));
 if (howFarAway > farthestAway) {
   farthestAway = howFarAway;
 }
 return prev;
}, {});
const final = calculateHowFarAway(createRubric(oppositDirections, total));

console.log('PT 1!', final);
console.log('PT 2', farthestAway);

function createRubric(configArr, totalObj) {
  return configArr.reduce((prev, curr) => {
    const [one, two] = curr;
    const oneNumber = totalObj[one] || 0;
    const twoNumber = totalObj[two] || 0;
    if (oneNumber >= twoNumber) {
      prev[one] = oneNumber - twoNumber;
      return prev;
    }
    prev[two] = twoNumber - oneNumber;
    return prev;
  }, {});
}

function calculateHowFarAway(obj) {
  let otherNumber = 0;
  return Object.keys(obj).reduce((prev, curr) => {
    if (curr.length === 1) { //this is either straight north or south and can be added regardless
      prev += obj[curr];
      return prev;
    }
    if (!otherNumber) {
      otherNumber = obj[curr];
      prev += otherNumber;
    } else {
      prev += obj[curr] - otherNumber;
    }
    return prev;
  }, 0);
}