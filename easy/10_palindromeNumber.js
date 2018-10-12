/**
 * Determine whether an integer is a palindrome. 
 * An integer is a palindrome when it reads the same backward as forward.
 * 
 * 121 > true
 * -121 > false 
 * 10 > false
 * 
 * .... Coud you solve it without converting the integer to a string?
 */

var inputs = [
	{ test: 121, res: true },
	{ test: -121, res: false },
	{ test: 10, res: false },
];

function palindromeNumber(num) {
	let ref = num, d = 0;
	if(num < 0) return false;
	while(num > 0) {
		d = d * 10 + (num % 10);
		num = Math.floor(num / 10);
	}

	return ref == d;
}

var results = [];
inputs.forEach((element, i) => {
	var result = palindromeNumber(element.test);
	results.push({
		elm: element.test,
		expected: element.res,
		output: result,
		result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
	});

	if (i === inputs.length - 1) {
		console.log("result: ", JSON.stringify(results));
	}
});