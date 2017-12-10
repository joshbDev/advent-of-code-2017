const ANSWER_NUMBER = 312051;
const flattenedCircle = [1, 1, 2, 4, 5, 10, 11, 23, 25, 26, 54, 57, 59, 122, 133, 142, 147, 304, 330, 351];


let isAroundHalf = false
let numToEnd = 4;
let currNumberToEnd = 0;
let endBack = 14;
while (flattenedCircle[flattenedCircle.length - 1] < ANSWER_NUMBER) {
  addNextItem(flattenedCircle);
}
console.log(flattenedCircle);


function addNextItem(flatArray) {
  // always add the previous number
  const lastItemIndex = flatArray.length;
  let newNumToAdd = Number(flatArray[lastItemIndex - 1]);
  if (currNumberToEnd === 0) {
    newNumToAdd += flatArray[lastItemIndex - endBack];
    flattenedCircle.push(newNumToAdd);
    currNumberToEnd++;
    return;
  }
  if (currNumberToEnd === 1) { //add the second to previous number on first item after pivot 
    newNumToAdd += flatArray[lastItemIndex - 2];
    newNumToAdd += flatArray[lastItemIndex - endBack];
    newNumToAdd += flatArray[lastItemIndex - endBack - 1]; //you also want the corner piece on the first item in
    flattenedCircle.push(newNumToAdd);
    endBack++;
    currNumberToEnd++;
    return;
  }
  if (currNumberToEnd === numToEnd) {
    newNumToAdd += flatArray[lastItemIndex - endBack];
    newNumToAdd += flatArray[lastItemIndex - endBack + 1];
    flattenedCircle.push(newNumToAdd);
    if (isAroundHalf) {
      isAroundHalf = false;
      numToEnd++;
    } else {
      isAroundHalf = true;
    }
    currNumberToEnd = 0;
    return;
  }
  if (currNumberToEnd === 2) {
    endBack++;
  }
  newNumToAdd += flatArray[lastItemIndex - endBack];
  newNumToAdd += flatArray[lastItemIndex - endBack + 1];
  newNumToAdd += flatArray[lastItemIndex - endBack + 2];
  flattenedCircle.push(newNumToAdd);
  currNumberToEnd++;
}