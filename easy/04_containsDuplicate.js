/**
 * Given an array of integers, find if the array contains any duplicates. 
 * Your function should return true if any value appears at least twice in the array, 
 * and it should return false if every element is distinct.
 */
var inputs = [
  { test: [1,2,3,4,5,6,7], res: false },
  { test: [1,2,2], res: true },
  { test: [], res: false }
];

function containsDuplicate(nums) {
  var x = new Set();
  for (let i = 0; i < nums.length; i++) {
    if(x.has(nums[i])){
      return true;
    } else {
      x.add(nums[i]);
    }
  }

  return false;
}

var results = [];
inputs.forEach((element, i) => {
  var result = containsDuplicate(element.test);
  results.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: element.res === result ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(results));
  }
});