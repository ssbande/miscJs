/*
Given a string, find the longest substring which is palindrome. 
For example, if the given string is “forgeeksskeegfor”, the output should be “geeksskeeg”.
Also check whether its a lucky palindrome. (Length of the longest palindrome is a prime number)
*/

var inputs = [
  {test: "forgeeksskeegfor", res: "geeksskeeg", luckyRes: false}, 
  {test: "1234329", res: "23432", luckyRes: true},
  {test: "1234567", res: "NOPAL", luckyRes: false},
];

function longestPalindrome(text) {
  var maxLength = 0; pal = "";

  for(var i = 0; i < text.length; i++) {
    var sub1 = text.substr(i, text.length);

    for(var j = text.length; j > 0; j--) {
      var sub2 = sub1.substr(0, j);
      if (sub2.length <= 1)
        continue;

      if(isPalindrome(sub2)) {
        if (sub2.length > maxLength) {
          maxLength = sub2.length;
          pal = sub2;
        }
      }
    }

    if(i === text.length - 1) {
      var res = pal !== "" ? { pal, isLucky: isPrime(sub2) } : {pal: "NOPAL", isLucky: false};
      return res;
    }
  }
}

function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

function isPrime(str) {
  var len = str.length, start = 2;
  while (start <= Math.sqrt(len)) {
    if(len % start++ < 1) return false;
  }

  return len > 1;
}


var resultArray = [];
inputs.forEach((element, i) => {
  var result = longestPalindrome(element.test);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result.pal,
    isLucky: element.luckyRes,
    isLuckyFromOp: result.isLucky,
    result: element.res === result.pal && element.luckyRes == result.isLucky ? "OK" : "FAILED"
  });

  if(i === inputs.length -1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});