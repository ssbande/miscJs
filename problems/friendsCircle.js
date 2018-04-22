/* PROBLEM STATEMENT ---------------------------------------------------------------------
 * There are S students in a class. Some of them are friends, while some are not. 
 * Their friendship is transitive in nature. e.g. if A is a direct friend of B 
 * and B is a direct friend of C, then A is an indirect friend of C.
 * 
 * A social circle is a group of students who are direct or indirect friends. 
 * 
 * You are given a SxS matrix M (S is the number of students) representing the friend 
 * relationship between students in class. If M[i][j] = 1, then the ith and jth students 
 * are direct friends with each other, otherwise not. 
 * 
 * Your task is returning the string, representing all the social circles separated by pipe(|)
 * among all the students. Individual members within the circle should be separated by a comma(,)
 * 
 * 
 * Write a function friendsCircles(M); that given a zero-indexed double dimensional array A of dimensions SxS
 * (in string format to be converted to a 2-D array), returns a string representing the pipe-separated 
 * social circles of comma separated friends. 
 * 
 * So, if we have 2 circles - one comprising of 0 & 1 and another comprising of just 2 - 
 * then the output will be "0,1|2". Also each circle should be sorted from lowest to highest 
 * and circles should be sorted by first element. 
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

