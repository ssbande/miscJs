/**
 * SINGLE NUMBER
 * 
 * Given a non-empty array of integers, every element appears twice except for one. Find that single one.
 * Note:Your algorithm should have a linear runtime complexity. 
 * Could you implement it without using extra memory?
 */

var inputs = [
  { test: [2, 2, 1], res: 1 },
  { test: [4, 1, 2, 1, 2], res: 4 }
];

function singleNumber(nums) {
  // var visited = new Set();
  // for (let i = 0; i < nums.length; i++) {
  //   if(!visited.has(nums[i])) {
  //     visited.add(nums[i]);
  //   } else {
  //     visited.delete(nums[i]);
  //   }
  // }

  // return Array.from(visited)[0];

  let result = 0;
  for(let i = 0; i < nums.length; i++) {
    result ^= nums[i]; // XOR operation. 1 XOR 1 = 0, 1 XOR 0 = 1, 0 XOR 1 = 1, 0 XOR 0 = 0
  }
  return result;
}

var results = [];
inputs.forEach((element, i) => {
  var result = singleNumber(element.test);
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