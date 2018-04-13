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

function friendsCircles(M) {
  var allFriends = [], groupSets = [], visitedPeople = new Set();

  for(var i = 0; i < M.length; i++) {
    for(var j = i; j < M.length; j++) {
      if(M[i][j] == M[j][i] && M[j][i] == 1 && i != j) {  
        visitedPeople.add(i).add(j);
        allFriends.map((e, k) => {
          e.includes(i) ? allFriends[k] = e.concat([j])
            : ((e.includes(j)) ? allFriends[k] = [i].concat([e])
              : allFriends.push([i, j]));
        });

        if(allFriends.length === 0) {
          allFriends.push([i, j]);
        }
      }
    }

    if (i === M.length - 1) {
      for(var x = 0; x < M.length; x++) {
        if(!visitedPeople.has(x)){
          allFriends.push([x]);
        }
      }
    }
  }

  groupSets = allFriends.map(a => a.join());
  return groupSets.join("|");
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

