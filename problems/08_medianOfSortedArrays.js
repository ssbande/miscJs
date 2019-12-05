/**
 * HARD 
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 * You may assume nums1 and nums2 cannot be both empty.
 * 
 * Example 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 * The median is 2.0
 * 
 * Example 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * The median is (2 + 3)/2 = 2.5
 */

var inputs = [
  { test: { nums1: [1, 3], nums2: [2] }, res: 2.0 },
  { test: { nums1: [1, 2], nums2: [3, 4] }, res: 2.5 }
]

const findMedian = (nums1, nums2) => {
  // if we create the sorted arrays manually, then it can reduce the time needed.
  const whole = [...nums1, ...nums2].sort((a, b) => a - b);
  const middle = whole.length / 2
  return Number.isInteger(middle) ? (whole[middle] + whole[middle - 1]) / 2 : whole[Math.floor(middle)];
}

inputs.forEach((element, i) => {
  if(i === 0) console.log('==================== TEST CASE RUN RESULT ====================')
  var result = findMedian(element.test.nums1, element.test.nums2);
  const res = {
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
  }

  console.log(`TestInput${String(i)}: ${JSON.stringify(res)} ${i === inputs.length - 1 ? '\n' : "\n----------------"}`);
});