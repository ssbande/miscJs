/**
 * PLUS ONE
 * 
 * Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
 * The digits are stored such that the most significant digit is at the head of the list, 
 * and each element in the array contain a single digit.
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
 */

var inputs = [
  { test: [2, 2, 1], res: [2,2,2] },
  { test: [9], res: [1,0] },
  { test: [1, 9], res: [2,0] },
  { test: [9, 9], res: [1,0,0] },
  { test: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3], res: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4] }
];

function plusOne(digits) {
  checkNine(digits, digits.length - 1);
  return digits;
}

function checkNine(digits, index) {
  if(digits[index] != 9) {
    digits[index]++;
    return;
  } else {
    digits[index] = 0; // as digits[index] == 9;
    if(index == 0 ){
      digits.unshift(1);
    } else {
      return checkNine(digits, index - 1);
    }
  }
}

var results = [];
inputs.forEach((element, i) => {
  var result = plusOne(element.test);
  results.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(results));
  }
});