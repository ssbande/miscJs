/**
 * Rotate an array of n elements to the right by k steps.
 * For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].
 * Note: Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
 */

var inputs = [
  { test: {nums: [1,2,3,4,5,6,7], k: 3}, res: [5,6,7,1,2,3,4] },
  { test: {nums: [1,2], k: 3}, res: [2,1] },
  { test: {nums: [1,2,3], k: 4}, res: [3,1,2] },
  { test: {nums: [1,2,3,4,5,6,7,8,9,10,11,12,13], k: 17}, res: [10,11,12,13,1,2,3,4,5,6,7,8,9] }
];

function rotate(nums, k) {
  // Way 1 
  // nums = nums.splice((nums.length - k), k).concat(nums.splice(0, nums.length));
  // console.log("way 1: ", nums);

  // Way 2
  // while(k > 0) {
  //   let x = nums.pop();
  //   nums.unshift(x);
  //   k--;
  // }
  // console.log("way 2: ", nums);

  // Way 3
  var x = nums.length - Math.floor(k % nums.length + k / nums.length) + 1;
  console.log("rem: ", x);
  var loopLength = nums.length - k < 0 ? x : nums.length - k;
  for (let i = 0; i < loopLength; i++) {
    nums.push(nums[0]);
    nums.shift();
  }

  return nums;
}

var results = [];
inputs.forEach((element, i) => {
  var result = rotate(element.test.nums, element.test.k);
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