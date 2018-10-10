/**
 * LEVEL - HARD
 */

var inputs = [
	{ test: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], res: 6 },
	// { test: [0, 3, 0, 2, 2, 2, 2, 3, 2, 1, 2, 1], res: 3 }
]


function getWaterLevel(levels) {
	let left = 0, right = 0, variance = 0;
	if (levels[0] < levels[1]) {
		levels = levels.slice(1);
		console.log(levels);
	}

	let actualVariance = 0;
	for (var i = 0; i < levels.length; i++) {
		const left = levels[i];
		for (let j = i + 1; j < levels.length; j++) {
			const right = levels[j];

			if (right - left >= 0) {
				// let x = i == 0 ? left : levels[i - 1];
				let y = levels.slice(i, j);
				let x = Math.min(...y);

				if (left !== x) {
					let maxPossible = Math.min(left, right);
					let newVariance = variance + maxPossible - x;
					y.forEach(m => actualVariance += maxPossible - m);
					console.log('jhhjh: ', y, ' min: ', x, ' maxToDeductFrom: ', maxPossible);
					console.log(i, j, '---', left, x, right);
					console.log('yahan variance badhao ', variance, newVariance, actualVariance);
					variance = newVariance;
					i = j - 1;
					break;
				}
			}
		}
	}

	return actualVariance;
}

var resultArray = [];
inputs.forEach((element, i) => {
	var result = getWaterLevel(element.test);
	resultArray.push({
		elm: element.test,
		expected: element.res,
		output: result,
		result: element.res === result ? "OK" : "FAILED"
	});

	if (i === inputs.length - 1) {
		console.log("result: ", JSON.stringify(resultArray));
	}
});