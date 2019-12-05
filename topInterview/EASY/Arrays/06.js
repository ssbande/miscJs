/**
 * Given two arrays, write a function to compute their intersection.
 * 
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2] 
 * Output: [2,2]
 * 
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4] 
 * Output: [4,9]
 * 
 * Note:
 * Each element in the result should appear as many times as it shows in both arrays. 
 * The result can be in any order.
 */

var inputs = [
  { test: {nums1: [1, 2, 2, 1], nums2: [2, 2]}, res: [2, 2] },
  { test: {nums1: [4, 9, 5], nums2: [9, 4, 9, 8, 4]}, res: [4, 9] }
];

function intersect(nums1, nums2) {
  const loopArr = nums1.length < nums2.length ? nums1 : nums2;
  const otherArr = nums1.length < nums2.length ? nums2 : nums1;
  const result = [];

  for (let index = 0; index < loopArr.length; index++) {
    const e = loopArr[index];
    if(otherArr.includes(e)) {
      result.push(e);
      otherArr.splice(otherArr.indexOf(e), 1);
    }
  }

  return result;
}

var results = [];
inputs.forEach((element, i) => {
  var result = intersect(element.test.nums1, element.test.nums2);
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