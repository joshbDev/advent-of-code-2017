const fs = require('fs');

const input = fs.readFileSync('./info', 'utf8');
const inputArray = input.split('\n');
const inputArrayCleaned = inputArray.map((item) => {
  return item.split('\t');
})
const allSum = inputArrayCleaned.reduce((prev, curr) => {
  let min = 0;
  let max = 0;
  curr.forEach((item) => {
    const convertedNum = Number(item);
    if (!min || (convertedNum < min)) {
      min = convertedNum;
    }
    if (!max || (convertedNum > max)) {
      max = convertedNum;
    }
  });
  const newPrev = prev + (max - min);
  return newPrev;
}, 0)
console.log(allSum);