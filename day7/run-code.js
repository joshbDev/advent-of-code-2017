const fs = require('fs');

const base = require('./run-code-pt1');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
const arrayOfWeights = [];
const dadumpch = {}
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

function addUpList(key, indexOfAddition, howManyDeep) {
  if (!dadumpch[indexOfAddition]) {
    dadumpch[indexOfAddition] = {}
  }
  if (!dadumpch[indexOfAddition][howManyDeep]) {
    dadumpch[indexOfAddition][howManyDeep] = [];
  }
  const currentItem = hashMap[key];
  if (!arrayOfWeights[indexOfAddition]) {
    arrayOfWeights[indexOfAddition] = Number(currentItem.value);
  } else {
    arrayOfWeights[indexOfAddition] = Number(currentItem.value + arrayOfWeights[indexOfAddition]);
  }
  dadumpch[indexOfAddition][howManyDeep].push(currentItem.value);
  if (currentItem.children) {
    currentItem.children.forEach((child) => {
      addUpList(child, indexOfAddition, howManyDeep + 1);
    })
  } else {
  }
}

hashMap[base].children.forEach((item, index) => {
  addUpList(item, index, 0);
})
Object.keys(dadumpch).forEach((item) => {
  Object.keys(dadumpch[item]).forEach((lowerItem) => {
    let howMuchPerRow = 0
    dadumpch[item][lowerItem].forEach((num) => {
      console.log(item, lowerItem, num)
    })
  })
})
