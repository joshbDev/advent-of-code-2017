const fs = require('fs');
const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\t');
const inputArrayCleaned = inputArray.map(item => Number(item));
let reconfigurations = 0;
let isDuplicateConfig = false;
let isSecondMatched = false;

const previousArrayConfigs = [];
let firstMatchedArray = undefined;

let tempNewArray = inputArrayCleaned;

while (!isDuplicateConfig || !isSecondMatched) {
  redistribute(tempNewArray);
  
}

console.log('DONE!', previousArrayConfigs.length);
console.log('SEEN AGAIN!', reconfigurations);

function redistribute(arrayNum) {
  if (!isDuplicateConfig) {
    previousArrayConfigs.forEach((previousArray) => {
      let isAllSame = true;
      arrayNum.forEach((item, index) => {
        if (item !== previousArray[index]) {
          isAllSame = false;
        }
      });
      if (isAllSame) {
        isDuplicateConfig = true;
        firstMatchedArray = [...arrayNum];
      }
    });
  } else {
    reconfigurations++
    if (firstMatchedArray) {
      let allIsSame = true
      arrayNum.forEach((item, index) => {
        if (item !== firstMatchedArray[index]) {
          
          allIsSame = false;
        }
      });
      if (allIsSame) {
        isSecondMatched = true;
      }
    }
  }
  if (isDuplicateConfig && isSecondMatched) {return;}
  let tempArray = arrayNum;
  previousArrayConfigs.push([...arrayNum]);
  let highestNumArrayIndex = 0;
  let tempHighNum = 0
  tempArray.forEach((item, index) => {
    if (item > tempHighNum) {
      highestNumArrayIndex = index;
      tempHighNum = item;
    }
  });
  let numtoRedistribute = tempArray[highestNumArrayIndex];
  tempArray[highestNumArrayIndex] = 0;
  for (let x = highestNumArrayIndex + 1; x < arrayNum.length; x++) {
    if (numtoRedistribute) {
      tempArray[x]++;
      numtoRedistribute--;
    }
  }
  while(numtoRedistribute) {
    tempArray.forEach((item, index) => {
      if (numtoRedistribute) {
        numtoRedistribute--;
        tempArray[index]++;
      }
      return item;
    });
  }
  tempNewArray = tempArray;
};