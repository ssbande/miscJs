/**
 * MEDIUM 
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 * 
 * Example 1:
 * Input: "babad"
 * Output: "bab"
 * Note: "aba" is also a valid answer.
 * 
 * Example 2:
 * Input: "cbbd"
 * Output: "bb"
 */

var inputs = [
  { test: { text: 'babad' }, res: 'bab' },
  { test: { text: 'cbbd' }, res: 'bb' }
]

const longestPalindrome = (str) => {
  console.log('input str: ', str);
}

inputs.forEach((element, i) => {
  if(i === 0) console.log('==================== TEST CASE RUN RESULT ====================')
  var result = longestPalindrome(element.test.text);
  const res = {
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
  }

  console.log(`TestInput${String(i)}: ${JSON.stringify(res)} ${i === inputs.length - 1 ? '\n' : "\n----------------"}`);
});