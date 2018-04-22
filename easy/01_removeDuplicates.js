/**
 * Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
 * Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
 */

var inputs = [
  { test: [1, 1, 2], res: 2 },
  { test: [0,0,1,1,1,2,2,3,3,4], res: 5 }
];


function removeDuplicates(nums) {
  var count = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[count] = nums[i];
    count = (i !== nums.length - 1 ) ? ((nums[i] !== nums[i+1]) ? count + 1 : count) : count + 1
  }

  return count;
}



// TEST METHOD ----------------------------------------------------
var resultArray = [];
inputs.forEach((element, i) => {
  var result = removeDuplicates(element.test);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: element.res === result ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});