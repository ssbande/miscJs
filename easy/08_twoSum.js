/**
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target. 
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * nums = [2, 7, 11, 15] target = 9 return [0,1]
 */

var inputs = [
  { test: {nums: [11, 2, 7, 15], target: 9}, res: [1, 2] }
];

function twoSum(nums, target) {
  var viz = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    var x = viz.filter(v => target - n === v);
    if(x.length > 0) {
      return [nums.indexOf(x[0]), i];
    } else {
      viz.push(n);
    }
  }

  return [];
}

var results = [];
inputs.forEach((element, i) => {
  var result = twoSum(element.test.nums, element.test.target);
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