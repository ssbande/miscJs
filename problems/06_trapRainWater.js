/**
 * LEVEL - HARD
 * Given n non-negative integers representing an elevation map,
 * where the width of each bar is 1, 
 * compute how much water is able to trap after raining. 
 * 
 * Say elevation is: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1].
 * In this case 6 units of rain water are being trapped. 
 */

var inputs = [
	{ test: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], res: 6 },
	{ test: [0, 3, 0, 2, 2, 2, 2, 3, 2, 1, 2, 1], res: 8 },
	{ test: [0, 3, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], res: 12 },
	{ test: [5, 4, 1, 2], res: 1 },
];


function trapRainWater(height) {
	let left = 0, right = height.length - 1;
	let maxLeft = 0, maxRight = 0, ans = 0;

	while(left < right) {
		maxLeft = Math.max(height[left], maxLeft);
		if(maxLeft > height[left]) {
			ans += maxLeft - height[left];
		}

		maxRight = Math.max(height[right], maxRight);
		if(maxRight > height[right]) {
			ans += maxRight - height[right];
		}

		height[left] < height[right] ? left++ : right--;
	}

	return ans;
}

function trapRainWater_1(levels) {
	// console.log('input: ', levels);
	let ans = 0;
	for (let i = 0; i < levels.length;) {
		const element = levels[i];
		let left = { max: -1, pos: -1 };
		let right = { max: -1, pos: -1 };

		let leftArray = levels.slice(0, i);
		let rightArray = levels.slice(i + 1, levels.length);

		leftArray.forEach((ll, l) => {
			// console.log('ll: ', ll, ' left.max: ', left.max, ' element: ', element, ' pos: ', left.pos);
			if (ll > element) {
				left.max = ll;
				left.pos = l;
			}
		});

		rightArray.forEach((rr, r) => {
			if (rr > right.max && rr > element) {
				right.max = rr;
				right.pos = i + 1 + r;
			}
		});

		if (left.pos !== -1 && right.pos !== -1) {
			// console.log('left ', left, ' self: ', element, ' i: ', i, ' right: ', right);
			const reducedArray = levels.slice(left.pos + 1, right.pos);
			let minToAdd = Math.min(left.max, right.max);
			// console.log('minToAdd: ', minToAdd);
			reducedArray.forEach(r => {
				if (r > minToAdd) {
					minToAdd = r;
				}
				// console.log(r, ',', minToAdd);
				ans += minToAdd - r;
			});
			// console.log('reduced array: ', reducedArray, minToAdd);
			// console.log('--------- ', ans);
		}

		i = right.pos !== -1 && left.pos !== -1 ? right.pos + 1 : i + 1;
	}

	return ans;
}

var resultArray = [];
inputs.forEach((element, i) => {
	var result = trapRainWater(element.test);
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