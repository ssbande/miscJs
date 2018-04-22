/**
 * Given a string, find the longest substring which is palindrome. 
 * For example, if the given string is “forgeeksskeegfor”, the output should be “geeksskeeg”.
 * Also check whether its a lucky palindrome. (Length of the longest palindrome is a prime number)
 */

var inputs = [
  {test: "forgeeksskeegfor", res: "geeksskeeg", luckyRes: false}, 
  {test: "1234329", res: "23432", luckyRes: true},
  {test: "1234567", res: "NOPAL", luckyRes: false},
];

function longestPalindrome(text) {
  var maxLength = 0; pal = "";

  // Looping from start to the end of the string.
  for(var i = 0; i < text.length; i++) {
    var sub1 = text.substr(i, text.length);

    // looping from end to the start of the string
    for(var j = text.length; j > 0; j--) {

      // Fetch the part of the string from start to the length of j
      var sub2 = sub1.substr(0, j);
      if (sub2.length <= 1)
        continue;

      // Check whether the sub string is a palindrome or not. 
      if(isPalindrome(sub2)) {

        // To fetch the largest of the string matching a palindrome. 
        if (sub2.length > maxLength) {
          maxLength = sub2.length;
          pal = sub2;
        }
      }
    }

    // If there is a palindrome in the given string, 
    // return the palindrome and whether the fetched palindrome is 
    // a lucky palindrome or not. 
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

  // return true / false if the string length is a prime number or not.
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