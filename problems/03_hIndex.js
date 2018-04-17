/**
 * LEVEL- MEDIUM
 * Given an array of citations (each citation is a non-negative integer) of a researcher, 
 * write a function to compute the researcher's h-index.
 * According to the definition of h-index on Wiki: 
 * "A scientist has index h if h of his/her N papers have at least h citations each, 
 * and the other N-h papers have no more than h citations each." 
 * 
 * For example, given citations = [3, 0, 6, 1, 5], which means the researcher has 5 papers in total 
 * and each of them had recieved **3, 0, 6, 1, 5** citations respectively. 
 * Since the researcher has 3 papers with at least 3 citations each and 
 * the remaining two has no more than 3 citations each, his h-index is 3
 * 
 * NOTE: if there are several possible values of h, the maximum one is taken as the h-index.
 */

var inputs = [
  { test: { citations: [3, 0, 6, 1, 5]}, res: 3 },
  { test: { citations: [3, 0, 6, 1, 5, 8]}, res: 3 }
]

function getHIndex(citations) {
  var hIndices = [...citations].sort().filter((f, j) => { if(f >= citations.length - j) return citations.length - j});
  return hIndices.length;
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = getHIndex(element.test.citations);
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