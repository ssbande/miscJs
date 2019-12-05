/**
 * MOVE ZEROES
 * 
 * Given an array nums, write a function to move all 0's to the end of it 
 * while maintaining the relative order of the non-zero elements.
 * For example, given nums = [0, 1, 0, 3, 12]. after calling your function, nums should be [1, 3, 12, 0, 0]
 * Note:
 * 1. You must do this in place without making a copy of the array.
 * 2. Minimize the total number of operations.
 */

var inputs = [
  { test: [0, 1, 0, 3, 12], res: [1, 3, 12, 0, 0] }
];

function moveZeroes(nums) {
  var cnt = 0; 
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      nums[cnt++] = nums[i];
    }
  }

  while(cnt < nums.length) {
    nums[cnt++] = 0;
  }

  return nums;
}

var results = [];
inputs.forEach((element, i) => {
  var result = moveZeroes(element.test);
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