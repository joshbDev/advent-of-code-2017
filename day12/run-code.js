const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputArray = input.split('\n');
const hashMap = inputArray.reduce((prev, curr) => {
  const [item, connected] = curr.split(' <-> ');
  const connectedArray = connected.split(', ');
  prev[item] = {
    name: item,
    connection: connectedArray,
  };
  return prev;
}, {});

const finalArray = [];

function findConnections(mapObj, arrayToPushTo, itemToFind, isDeleter = false) {
  if (mapObj[itemToFind] && !arrayToPushTo.includes(itemToFind)) {
    arrayToPushTo.push(itemToFind);
    if (mapObj[itemToFind].connection) {
      mapObj[itemToFind].connection.forEach((item) => {
        findConnections(mapObj, arrayToPushTo, item, isDeleter);
      });
    }
    if (isDeleter) {
      delete mapObj[itemToFind];
    }
  }
}
findConnections(hashMap, finalArray, '0')
console.log('PT 1!', finalArray.length);

let howManyGroups = 0;
const deleteArray = [];
const itemToDelete = Object.assign({}, hashMap);
while (Object.keys(itemToDelete).length) {
  howManyGroups++;
  findConnections(itemToDelete, deleteArray, Object.keys(itemToDelete)[0], true);
}
console.log('PT 2!', howManyGroups)