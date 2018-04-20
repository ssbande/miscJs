/**
 * 06. Different ways to add paranthesis
 * LEVEL - MEDIUM
 * Given a string of numbers and operators, return all possible results from computing all the 
 * different possible ways to group numbers and operators. The valid operators are +, -, *.
 * Example 1: 
 * Input: 2-1-1
 * ((2 - 1) - 1) = 0
 * (2 - (1 - 1)) = 2
 * Output: [0,2]
 * Example 2:
 * Input: 2*3-4*5
 * (2 * (3 - (4 * 5))) = -34
 * ((2 * 3) - (4 * 5)) = -14
 * ((2 * (3 - 4) * 5)) = -10
 * (2 * ((3 - 4) * 5)) = -10
 * (((2 * 3) - 4) * 5) = 10
 * Output: [-34, -14, -10, -10, 10]
 */
var inputs = [
  {test: "2-1-1", res: [0,2]}
]

function diffWaysToSum(expression) {
  console.log("expression: ", expression);
}


var resultArray = [];
inputs.forEach((element, i) => {
  var result = diffWaysToSum(element.test);
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