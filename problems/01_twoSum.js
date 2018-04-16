/**
 * LEVEL - EASY
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target. 
 * You may assume that each input would have exactly one solution, and you may not use the same element twice. 
 * 
 * Given nums = [2, 7, 11, 15], target = 9
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0,1]
 */

var inputs = [
  { test: { nums: [2, 7, 11, 15], target: 9 }, res: [0, 1] }
]

function twoSum(nums, target) {
  var visited = [nums[0]], result = [], viz = [];
  for (let k = 1; k < nums.length; k++) {
    viz = visited.filter(v => target - nums[k] === v);

    if (viz.length > 0) {
      result = [nums.indexOf(viz[0]), k];
      break;
    } else {
      visited.push(nums[k]);
    }
  }

  return result;
}


var resultArray = [];
inputs.forEach((element, i) => {
  var result = twoSum(element.test.nums, element.test.target);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});