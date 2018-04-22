/**
 * Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
 * The digits are stored such that the most significant digit is at the head of the list, 
 * and each element in the array contain a single digit.
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
 */

var inputs = [
  { test: [2, 2, 1], res: [2,2,2] },
  { test: [9], res: [1,0] },
  { test: [9, 9], res: [1,0,0] },
  { test: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3], res: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4] }
];

function plusOne(digits) {
  var str = ""
  // digits.forEach(d => str += d.toString());
  // console.log("str: ", str);
  // console.log("parse str: ", parseFloat(str));
  // var newStr = (parseInt(str) + 1).toString();
  // console.log("newStr: ", (parseInt(str) + 1).toString())
  // var newDigits = newStr.split('').map(s => parseInt(s));
  // return newDigits;
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