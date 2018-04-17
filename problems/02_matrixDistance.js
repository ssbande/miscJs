/**
 * Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell. 
 * The distance between two cells is 1. 
 * 
 * Conds:: 
 * 1. The number of elements of the given matrix will not exceed 10,000
 * 2. There are at least one 0 in the given matrix 
 * 3. The cells are adjacent in only four directions: up, down, left, right
 */

var inputs = [
  { test: { matrix: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] }, res: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
  { test: { matrix: [[0, 0, 0], [0, 1, 0], [1, 1, 1]] }, res: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] },
  { test: { matrix: [[0, 0, 0, 0], [0, 1, 0, 1], [1, 1, 1, 0], [0, 1, 0, 1]] }, res: [[0, 0, 0, 0], [0, 1, 0, 1], [1, 2, 1, 0], [0, 1, 0, 1]] },
  { test: { matrix: [[1, 1, 1], [0, 1, 0], [0, 0, 0]] }, res: [[1, 2, 1], [0, 1, 0], [0, 0, 0]] },
  // { test: { matrix: [[1, 0, 1, 1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 1, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 0, 0, 1, 0, 0], [1, 0, 1, 0, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 0, 0, 0, 0, 1], [0, 0, 1, 0, 1, 1, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 0, 1, 1], [1, 0, 0, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 0], [1, 1, 1, 1, 0, 1, 0, 0, 1, 1]], 
  // res: [[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],[0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,2,1,1,0,1],[2,1,1,1,1,2,1,0,1,0],[3,2,2,1,0,1,0,0,1,1]]}} 
]

function matrixDistance(matrix) {
  var dist = [...matrix].map((e) => e.map(x => x === 1 ? 10001 : x));
  var rows = matrix.length;
  var cols = matrix[0].length;

  // For Loop execution. 
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      if(matrix[i][j] === 0) {
        dist[i][j] = 0;
      } else {
        for(var k = 0; k < rows; k++) {
          for(var l = 0; l < cols; l++) {
            if(matrix[k][l] === 0) {
              var d1 = Math.abs(k - i) + Math.abs(l - j);
              dist[i][j] = Math.min(dist[i][j], d1);
            }
          }
        }
      }
    }
  }

  return dist;
}

// Better. 
// Compact and less complexity.
function matrixDistanceCompact(matrix) {
  var result = [], zeroes = [].concat(...matrix.map((m,i) => {return m.map((n,j) => {return {"col": j, "row": i, "toConsider": n === 0};})}))
                 .filter(f => f["toConsider"] == true);
  matrix.forEach((m, i) => {
    result.push(m.map((n,j) => (n == 0) ? 0 : Math.min(...zeroes.map(z => Math.abs((z["row"] - i)) + Math.abs((z["col"] - j))))));
  });

  return result;
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = matrixDistance(element.test.matrix);
  var result2 = matrixDistanceCompact(element.test.matrix);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED",
    result2: JSON.stringify(element.res) === JSON.stringify(result2) ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});