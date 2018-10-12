/**
 * Given a 32-bit signed integer, reverse digits of an integer.
 * Assume we are dealing with an environment which could only store integers 
 * within the 32-bit signed integer range: [−231,  231 − 1]. 
 * For the purpose of this problem, assume that your function returns 0 
 * when the reversed integer overflows.
 */


var inputs = [
	{ test: 123, res: 321 },
	{ test: -123, res: -321 },
	{ test: 120, res: 21 },
];

function reverseInteger(num) {
	let sign = Math.sign(num), d = 0;
	num = Math.abs(num)
	while(num > 0) {
		d = d * 10 + (num % 10);
		num = Math.floor(num / 10);
	}

	if(d > Math.pow(2, 31)) {
		d = 0;
	}
	
	return (sign * d);
}

var results = [];
inputs.forEach((element, i) => {
	var result = reverseInteger(element.test);
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