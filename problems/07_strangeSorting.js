/**
 * LEVEL - HARD
 * Due to a bug in trading program, the digits of the decimal system got reshuffled. 
 * For instance, each 0 changed to 2, each 1 got changed to 3, and each 2 got changed to 0. 
 * If the correct number is 021, the system shows 203. The users of the trading software care about the relative values
 * of their positions. Before rolling out the fix for the underlying issue, the company decided to first issue 
 * a modified sorting patch that will show the relative order based on the correct values sorted ascending. 
 * 
 * Gioven the numbers that the program needs to sort and the mapping, i.e. the shuffled version of the decimal digits, 
 * return a list of the jumbled numbers sorted by their correct decimal values, ascending. 
 * If multiple mapped values are equal, the values returned should be in the original order they were presented. 
 * 
 * mapping = [3,5,4,6,2,7,9,8,0,1] of fixed length of m = 10 and another array of numbers strings 
 * nums = ['990', '332', '32'] of length n = 3
 * 
 * Map 990 as follows: 
 *  1. First digit is '9'. In mapping array, 9 is at position 6 so the first digit of the mapped value is '6' 
 *  2. Second digit is '9', Again the value is at position 6, so the mapped value is now '66'.
 *  3. Third digit is '0', found at position 8 of the mapping array. The mapped value is 668.
 * 
 * Map 332 as:
 *  1. First and second digits are both '3' which is found at index 0 of the mapping. The mapped value is 00.
 *  2. The third digit is '2' found at index 4 of mapping, so the mapped values i 004 or 4 as integer
 * 
 * The value 32 maps to '04' or integer 4 which equals the previous value. 
 * 
 * 
 * Ordering by integer values yields [44,4,668] and retaining order of '332' and '32' 
 * results in a return array of associated original values: ['332', '32', '990']
 * 
 */

var inputs = [
  { test: { nums: ['990', '332', '32'], mapping: [3, 5, 4, 6, 2, 7, 9, 8, 0, 1] }, res: ['332', '32', '990'] },
  // { test: { nums:  ['12','02','4', '023', '65', '83', '224', '50'], mapping: [2,1,4,8,6,3,0,9,7,5] }, res: ['4', '224', '12', '83', '65', '02', '50', '023'] }
]

const strangeSort = (nums, mapping) => {
  const mapper = {}, values = {}, result = [];
  mapping.forEach((m, i) => mapper[m] = String(i));
  for (const num of nums) {
    const converted = Number([...num].reduce((p, c, i) => (i === 0 ? '' : p) + mapper[c], [...num][0]))
    values[converted] = !values[converted] ? [num] : [...values[converted], num];
  }

  // As properties of an object will be traversed in ascending order for integer indices.
  // We dont have to sort. 
  for (const v in values) { result.push(...values[v]) }
  return result;
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = strangeSort(element.test.nums, element.test.mapping);
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