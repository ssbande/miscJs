/**
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 * 
 * Symbol       Value
 *   I             1
 *   V             5
 *   X            10
 *   L            50
 *   C           100
 *   D           500
 *   M          1000
 * 
 * For example, two is written as II in Roman numeral, just two one's added together. 
 * Twelve is written as, XII, which is simply X + II. 
 * The number twenty seven is written as XXVII, which is XX + V + II.
 * Roman numerals are usually written largest to smallest from left to right. 
 * However, the numeral for four is not IIII. Instead, the number four is written as IV. 
 * Because the one is before the five we subtract it making four. 
 * The same principle applies to the number nine, which is written as IX. 
 * 
 * There are six instances where subtraction is used:
 * 
 * I can be placed before V (5) and X (10) to make 4 and 9. 
 * X can be placed before L (50) and C (100) to make 40 and 90. 
 * C can be placed before D (500) and M (1000) to make 400 and 900.
 * 
 * Given a roman numeral, convert it to an integer. 
 * Input is guaranteed to be within the range from 1 to 3999.
 */

var inputs = [
	{ test: 'III', res: 3 },
	{ test: 'IV', res: 4 },
	{ test: 'IX', res: 9 },
	{ test: 'LVIII', res: 58 },
	{ test: 'MCMXCIV', res: 1994 },
];

function romanToInt(roman) {
	const dict = {
		'I': 1, 
		'V': 5,
		'X': 10, 
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
	}
	
	let intVal = 0;
	for (let i = 0; i < roman.length; i++) {
		const e = roman[i];
		const eVal = dict[e];
		let nextVal = 0, d = eVal;
		if(i < roman.length - 1) {
			const next = roman[i+1];
			nextVal = dict[next];
		}

		if(nextVal > eVal) {
			d = nextVal - eVal;
			i++;
		}

		intVal += d;

	}

	return intVal;
}

var results = [];
inputs.forEach((element, i) => {
	var result = romanToInt(element.test);
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