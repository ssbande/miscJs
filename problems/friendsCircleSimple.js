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

function friendsCircles(M) {
  var allFriends = [], groupSets = [], visitedPeople = new Set();

  for(var i = 0; i < M.length; i++) {
    for(var j = i; j < M.length; j++) {
       
      // Checking the condition for M[i][j] = M[j][i] = 1.
      // It goes through all the entries in M and then check which ones are direct friends. 
      // later in the loop, we are checking for indirect friends and if found then grouping them 
      // with the direct friends so as to form the social circle. 
      if(M[i][j] == M[j][i] && M[j][i] == 1 && i != j) {  

        // Add those nodes which we have already visited. 
        // Used set here so that even if some node is getting added multiple times, 
        // only one of its entry will be kept in 'visitedPeople'.
        visitedPeople.add(i).add(j);

        // Checking if there is any element already in allFriends 
        // which has a common element out of i / j. 
        // If present then group i / j with that element. 
        // if none of those are present, add the current i,j pair to 'allFriends'
        allFriends.map((e, k) => {
          e.includes(i) ? allFriends[k] = e.concat([j])
            : ((e.includes(j)) ? allFriends[k] = [i].concat([e])
              : allFriends.push([i, j]));
        });

        // If no elements in allFriends, just add the current i,j pair.
        if(allFriends.length === 0) {
          allFriends.push([i, j]);
        }
      }
    }

    if (i === M.length - 1) {
      
      // Check if there are any leaf nodes left from M. 
      // If yes, then add them as a single node in allFriends. 
      for(var x = 0; x < M.length; x++) {
        if(!visitedPeople.has(x)){
          allFriends.push([x]);
        }
      }
    }
  }

  // Create groups of the social circles. 
  groupSets = allFriends.map(a => a.join());

  // Combine all the social circles, separated with a pipe.
  return groupSets.join("|");
}


// TEST METHOD ----------------------------------------------------
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

