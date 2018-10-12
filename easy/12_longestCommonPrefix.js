/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 */

var inputs = [
	{ test: ['flower', 'flow', 'flight'], res: 'fl' },
	{ test: ['flower', 'flow'], res: 'flow' },
	{ test: ['dog', 'racecar', 'car'], res: '' },
	{ test: ['cars', 'carrace', 'car'], res: 'car' },
];

function longestCommonPrefix(strs) {
	let prefix = '';

	if(strs.length == 0) {
		return prefix;
	}


	const element = strs.pop();
	for (let i = 0; i < element.length; i++) {
		const e = element[i];
		if(strs.every(x => x[i] == e)) {
			prefix += e;
		} else {
			break;
		}
	}

	return prefix;
}

var results = [];
inputs.forEach((element, i) => {
	var result = longestCommonPrefix(element.test);
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