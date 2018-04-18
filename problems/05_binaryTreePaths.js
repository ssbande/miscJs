/**
 * LEVEL - MEDIUM
 * Given a binary tree, return all root-to-leaf paths.
 * For example, given a binary tree 
 *   1
 *  / \
 * 2   3
 * \
 *  5
 * 
 * All root-to-leaf paths are: ["1->2->5", "1->3"]
 */


// Definition of a binary tree node: 
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left; 
    this.right = right;
  }
}


var inputs = [
  {test: new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3)), res: ["1->2->5", "1->3"]}
]

// root is of TreeNode Type
function binaryTreePaths(root) {
  console.log(root);
  console.log(root.right.val);
  console.log(typeof(root));
}

var resultArray = [];
inputs.forEach((element, i) => {
  var result = binaryTreePaths(element.test);
  resultArray.push({
    elm: element.test,
    expected: element.res,
    output: result,
    result: JSON.stringify(element.res) === JSON.stringify(result) ? "OK" : "FAILED"
  });

  if (i === inputs.length - 1) {
    console.log("result: ", JSON.stringify(resultArray));
  }
});