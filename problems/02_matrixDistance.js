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
  { test: { matrix: [[0, 0, 0], [0, 1, 0], [1, 1, 1]] }, res: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] }
]

function getNearestZero(origMatrix, rowIndex, distance = 0, toDoTop = false, toDoBottom = false) {
  // console.log("current row: ", origMatrix[rowIndex], " rowIndex: ", rowIndex, "distance: ", distance);
  // console.log("toDoTop: ", toDoTop, " toDoBottom: ", toDoBottom);
  
  var row = origMatrix[rowIndex];
  var reducedMap = row.map((r, i) => {
    if(r === 0){
      return 0;
    } else {
      console.log("Found 1 @ row: ", rowIndex, " col: ", i);
      var rowZeroIndex = row.map((f, j) => f === 0 ? Math.abs(i - j) : -1).filter(f => f !== -1);
      console.log("row Zero Index: ", rowZeroIndex);
      if(rowZeroIndex.length > 0) {
        return Math.min(...rowZeroIndex);
      } else {
        // There is no 0 in the current row.
        // Now have to check in rows at top and bottom. 
        return 2;
      }
    }
  });

  console.log("reducedMap: ", reducedMap);
  return reducedMap;
}

function matrixDistance(matrix) {
  var dist = [...matrix];
  // var dist = [...matrix].map((e) => e.map(x => x === 1 ? 10001 : x));
  var rows = matrix.length;
  var cols = matrix[0].length;

  // Recursion Version.
  var x = dist.map((e, i) => {
    return getNearestZero(matrix, i);
  })

  // // For Loop execution. 
  // for(var i = 0; i < rows; i++) {
  //   for(var j = 0; j < cols; j++) {
  //     if(matrix[i][j] === 0) {
  //       dist[i][j] = 0;
  //     } else {
  //       for(var k = 0; k < rows; k++) {
  //         for(var l = 0; l < cols; l++) {
  //           if(matrix[k][l] === 0) {
  //             var d1 = Math.abs(k - i) + Math.abs(l - j);
  //             dist[i][j] = Math.min(dist[i][j], d1);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  console.log("dist: ", dist);
  return dist;
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = matrixDistance(element.test.matrix);
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