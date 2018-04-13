/**
 * There are N students in a class. Some of them are friends, while some are not. 
 * Their friendship is transitive in nature, i.e., if A is friend of B and B is friend of C, 
 * then A is also friend of C. 
 * A friend circle is a group of students who are directly or indirectly friends. 
 * You are given a N×N−matrix M which consists of characters Y or N. 
 * If M[i][j]=Y, then ith and jth students are friends with each other, otherwise not. 
 * You have to print the total number of friend circles in the class and the groups.
 */
var inputs = [
  { test: [[1,1,0], [1,1,0], [0,0,1]], res: "0,1|2"},
  { test:[[1,1,0], [1,1,1], [0,1,1]], res:"0,1,2"}
];


/*
1. We start with the first student (first row), i = 0. set visited[i] = Y
2. Initialize noOfCircles = 1
3. Move to next student j, for which M[i][j] == Y, set visited[j] = Y.
4. Recursively, find friends of j and mark them visited too till all students that can be reached from i=0 are covered. These will form 1 friend circle.
5. Once all friends of student 1 are traversed, we move to next unvisited student and increase noOfCircles by 1.
6. Repeat the above steps till all the students are visited.
7. Return noOfCircles.
*/ 
function friendsCircles(M) {
  let numCircles = 0;
  const visited = new Set();
  var groupStr = "";

  M.forEach((row, i) => {
    console.log("--------------- Starting new row -------------");
    console.log("row: ", JSON.stringify(row));

    if(visited.has(i)) {
      console.log(i.toString() + ' found in visited');
      return
    }

    numCircles++;

    const queue = row.map((x, i) => {
      var r = x ? i : -1;
      console.log("x: ", x.toString(), " i: ", JSON.stringify(i), " r: ", r);
      return r;
    });

    console.log("queue: ", queue);

    filteredQueue = queue.filter((x) => x > -1);
    console.log("filtered queue: ", filteredQueue);

    groupStr += filteredQueue.sort().join() + "|";


    while(filteredQueue.length > 0) {
      const f = filteredQueue.pop()
      console.log("f: ", f);

      if(!visited.has(f)) {
        visited.add(f);
        console.log("visited: ", visited);
        console.log("...M[f]: ", ...M[f]);
        filteredQueue.push(...M[f].map((x, i) => x ? i : -1).filter((x) => x > -1));
      }
    }

    console.log("----------------------------------");
  });

  console.log("numCircles: ", numCircles);
  console.log("groupStr: ", groupStr);

  console.log("m Length: ", (M.length - 1).toString());

  groupStr = numCircles === 1
    ? Array.apply(null, {length: M.length}).map((x, i) => i).join() + " "
    : groupStr;

  return groupStr.slice(0, -1);
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = friendsCircles(element.test);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: element.res === result ? "OK" : "FAILED"
  });

  if(i === inputs.length -1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});

