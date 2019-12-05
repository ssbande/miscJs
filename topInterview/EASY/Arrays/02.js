/**
 * BEST TIME TO BUY AND SELL STOCK II
 * 
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * Design an algorithm to find the maximum profit. You may complete as many transactions as you like 
 * (i.e., buy one and sell one share of the stock multiple times).
 * Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
 * Example 1:
 * Input: [7,1,5,3,6,4]
 * Output: 7
 * Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
 *      Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3
 * Example 2:
 * Input: [1,2,3,4,5]
 * Output: 4
 * Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
 *      Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
 *      engaging multiple transactions at the same time. You must sell before buying again. 
 * Example 3:
 * Input: [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transaction is done, i.e. max profit = 0.
 */

var inputs = [
  { test: [7, 1, 5, 3, 6, 4], res: 7 },
  { test: [1,2,3,4,5], res: 4 },
  { test: [7,6,4,3,1], res: 0 }
];

function maxProfit(prices) {
  var x = [], mp =[];
  for (let i = 0; i < prices.length; i++) {
    const buy = prices[i];
    let sell = i < prices.length - 1 ? prices[i+1] : 0;
    if(sell - buy > 0) {
      mp.push(sell-buy);
    }
  }
  return mp.reduce(add, 0); 
}

const add = (a, b) => a + b

// function maxProfit1(prices) {
//   var x = [], mp = [];
//   for (let i = 0; i < prices.length; i++) {
//     const buy = prices[i];
//     for (let j = i+1; j < prices.length; j++) {
//       const sell = prices[j];
//       if(sell - buy > 0) {
//         x.push({profit: sell - buy, bI: i, sI: j});
//         mp.push(sell-buy);
//       }
//     }
//   }

//   // console.log(x);
//   for (let a = 0; a < x.length; a++) {
//     const e = x[a];
//     for (let k = a + 1; k < x.length; k++) {
//       const z = x[k];
//       if(e.sI < z.bI ) {
//         mp.push(e.profit + z.profit);
//         console.log("e.sI: ", e.sI, " z.bi: ", z.bI, " mp: ", mp, " a: ", a, " k: ", k);
//       }      
//     }
//   }

//   console.log("mp: ", mp);
//   return Math.max(...mp, 0);
// }

var results = [];
inputs.forEach((element, i) => {
  var result = maxProfit(element.test);
  results.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: element.res === result ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(results));
  }
});