/**
 * LEVEL - EASY
 * Initially on a notepad, only one character 'A' is present. 
 * You can perform two operations on this notepad for each step: 
 * 1. Copy All: You can copy all the characters present on the notepad (partial copy is not allowed).
 * 2. Paste: You can paste the characters which are copied last time
 * 
 * Given a number 'n', you have to get exactly 'n' 'A's on the notepad by performing 
 * the minimum number of steps permitted. Output the minimum number of steps to get n 'A's.
 */

var inputs = [
  { test: 2, res: 2 },
  { test: 3, res: 3 },
  { test: 4, res: 4 },
  { test: 5, res: 5 },
  { test: 6, res: 5 },
  { test: 7, res: 7 },
  { test: 8, res: 6 },
  { test: 9, res: 6 },
  { test: 10, res: 7 },
  { test: 11, res: 11 },
  { test: 12, res: 7 },
  { test: 13, res: 13 },
  { test: 14, res: 9 },
  { test: 15, res: 8 }
]

function minSteps(n) {
  if(n == 0 || n == 1) {
    return 0;
  }

  /**
   * EXPLANATION: 
   * 1. Lets suppose n = 9;
   *  -- We need the lowest number just before 9 such that (9 % number === 0).
   *  -- So the lowest number is 3. We need to copy 3 (9/3) A's three times to get 9.
   *  -- For getting 3 A's we need to copy 1 A three times. So the answer is 6 (3 + 3). 
   * 2. Lets suppose n = 14
   *  -- We need the lowest number just before 14 such that (14 % number === 0).
   *  -- So the lowest number is 2. We need to copy 7 (14/2) A's two times to get 14.
   *  -- For getting 7 A's we need to copy 1 A seven times. So the answer is 9 (2 + 7).
   * 3. Lets suppose n = 81
   *  -- We need the lowest number just before 81 such that (81 % number === 0).
   *  -- So the lowest number is 3. We need to copy 27 A's three times. Now to get 27 A's 
   *  -- we need to copy (27/3) = 9 A's three times. To get 9 A's we need to copy 3 A's three times (9/3).
   *  -- To get 3 A's we need to copy 1 A three times. 
   *  -- SO the final answer is 3(81/27) + 3(27/9) + 3(9/3) + 3 (3/1) = 12.
   */

  var count = 0;
  for (let i = 2; i <= n; i++) {
    while(n % i === 0) {
      count += i;
      n = n / i;
    }
  }

  return count;
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = minSteps(element.test);
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