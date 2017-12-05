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

const dividedSum = inputArrayCleaned.reduce((prev, curr) => {
  curr.forEach((item, index) => {
    const convertedNum = Number(item);
    for (let x = index + 1; x < curr.length; x++) {
      const compareNumber = Number(curr[x]);
      if (convertedNum > compareNumber && convertedNum % compareNumber === 0) {
        prev += convertedNum / compareNumber;
      }
      if (convertedNum < compareNumber && compareNumber % convertedNum === 0) {
        prev += compareNumber / convertedNum;
      }
    }
  });
  return prev;
}, 0);
console.log(dividedSum);