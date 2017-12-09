const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
let highestNumber = 0;
const runningList = {};

inputArray.forEach((item) => {
  const [mathEquation, evaluation] = item.split(' if ');
  const [key, plusOrMinus, amount] = evaluation.split(' ');
  if (typeof runningList[key] === 'undefined') {
    runningList[key] = 0;
  }
  const isTrue = eval(`${runningList[key]} ${plusOrMinus} ${amount}`);
  if (isTrue) {
    doTheMath(mathEquation);
  }
});

console.log(runningList);
console.log('HIGHEST NUMBER!', highestNumber);

function doTheMath(ternaryString) {
  const [key, addOrSub, amount] = ternaryString.split(' ');
  if (typeof runningList[key] === 'undefined') {
    runningList[key] = 0;
  }
  if (addOrSub === 'inc') {
    runningList[key] += Number(amount);
  } else {
    runningList[key] -= Number(amount);
  }
  if (runningList[key] > highestNumber) {
    highestNumber = runningList[key];
  }
}