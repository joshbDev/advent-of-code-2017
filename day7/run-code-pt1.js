const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
let lowerItems = [];
const inputArrayCleanedNoBottom = inputArray.reduce((prev, curr) => {
  if (curr.includes(' -> ')) {
    const items = curr.split(' -> ')[1].split(', ');
    lowerItems = [...lowerItems, ...items];
    return [...prev, curr];
  }
  return prev;
}, []);

const answer = inputArray.reduce((prev, curr) => {
  if (prev) {return prev;}
  const item = curr.split(' -> ')[0].split(' (')[0];
  if (!lowerItems.includes(item)) {
    return item;
  }
  return prev;
}, '');

module.exports = answer;