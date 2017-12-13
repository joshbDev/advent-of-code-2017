const fs = require('fs');
const cloneDeep = (item) => JSON.parse(JSON.stringify(item));
const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
let lengthOfLazerArray = 0;
let totalDamage = 0;
let isCaught = false;


const arrayOfItems = inputArray.reduce((prev, curr) => {
  const [index, howDeep] = curr.split(': ');
  const lazerItem = {
    length: Number(howDeep),
    currLocation: 1,
    isReverse: false,
    totalIfCaught: index * howDeep,
  }
  if (Number(index) > lengthOfLazerArray) {
    lengthOfLazerArray = Number(index);
  }
  prev[index] = lazerItem;
  return prev;
}, {});
let pt1Obj = cloneDeep(arrayOfItems)
let pt2Obj = cloneDeep(arrayOfItems);


for (let x = 0; x <= lengthOfLazerArray; x++) {
  moveAllItems(pt1Obj, x);
}

console.log('PT 1!', totalDamage);

let canMakeitThrough = false;
let howManyDelays = 0;
while(!canMakeitThrough) {
  totalDamage = 0;
  isCaught = false;
  let usePt2Obj = cloneDeep(pt2Obj);
  for (let x = !howManyDelays ? 0 : -1; x <= lengthOfLazerArray; x++) {
    if (isCaught) {break;}
    if (x === 0) {
      pt2Obj = cloneDeep(usePt2Obj);
    }
    moveAllItems(usePt2Obj, x, isCaught);
  }
  if (!isCaught) {
    canMakeitThrough = true;
  } else {
    howManyDelays++;
  }
}
console.log('PT 2:', howManyDelays);

function moveAllItems(objOfItems, currIndex) {
  if (objOfItems[currIndex] && objOfItems[currIndex].currLocation === 1) {
    isCaught = true;
    totalDamage += objOfItems[currIndex].totalIfCaught;
  }
  Object.keys(objOfItems).forEach((key) => {
    const item = objOfItems[key];
    if (item.length === 0) {
      return;
    }
    if (item.currLocation === 1) {
      item.isReverse = false;
    }
    if (item.currLocation === item.length) {
      item.isReverse = true;
    }
    !item.isReverse ? item.currLocation++ : item.currLocation--;
  })
}