const fs = require('fs');

const base = require('./run-code-pt1');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
const arrayOfWeights = [];
const hashMap = inputArray.reduce((prev, curr) => {
  const builtItem = {
    name: curr.split(' (')[0],
    value: Number(curr.split('(')[1].split(')')[0])
  }
  if (curr.includes(' -> ')) {
    builtItem.children = curr.split(' -> ')[1].split(', ');
  }
  prev[builtItem.name] = builtItem;
  return prev;
}, {});

function addUpList(key, indexOfAddition) {
  const currentItem = hashMap[key];
  if (!arrayOfWeights[indexOfAddition]) {
    arrayOfWeights[indexOfAddition] = Number(currentItem.value);
  } else {
    arrayOfWeights[indexOfAddition] = Number(currentItem.value + arrayOfWeights[indexOfAddition]);
  }
  if (currentItem.children) {
    currentItem.children.forEach((child) => {
      addUpList(child, indexOfAddition);
    })
  } else {
    console.log('INDEX: ', indexOfAddition, ' VAL:', currentItem.value);
  }
}

hashMap[base].children.forEach((item, index) => {
  console.log(hashMap[item].value);
  addUpList(item, index);
})
console.log('ARRAY OF WEIGHTS YO!', arrayOfWeights);
