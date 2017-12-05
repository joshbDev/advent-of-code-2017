const answerNumber = 312051;
let howManyOut = 0;
let width = 0;
const ADDED_PER_ROUND = 8;
const WIDTH_ADDED_PER_ROUND = 2;
function test(input, trackingHeight) {
  const newTrack = trackingHeight + ADDED_PER_ROUND;
  if (input + trackingHeight > answerNumber) {
    return input;
  }
  howManyOut++;
  width = width + WIDTH_ADDED_PER_ROUND;
  return test(input + trackingHeight, newTrack);
}
const amount = test(1, 0);
const howMuchLeft = answerNumber - amount;
const whichCorner = Math.floor(howMuchLeft / width);
const finalIn = howMuchLeft - (whichCorner * width);
const awayFromMiddle = (width / 2) - finalIn;

