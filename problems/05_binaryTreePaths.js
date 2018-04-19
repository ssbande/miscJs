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

  get hasLeftChild() {
    return this.left !== null;
  }

  get hasRightChild() {
    return this.right !== null;
  }

  traverseNode(x, isLeft) {
    var partVal = isLeft ? this.left.val : this.right.val
    x.map((e, i) => { e.slice(-1).pop() == this.val ? x[i] = e.concat([partVal]) 
      : (i === x.length - 1 ? x.push([this.val, partVal]) : e)
    })

    if(x.length === 0) {
      x.push([this.val, partVal]);
    }

    return x;
  }
}

var inputs = [
  {test: new TreeNode(1, new TreeNode(2, null, new TreeNode(4, new TreeNode(5))), new TreeNode(3, new TreeNode(6))), 
    res: ["1->2->4->5", "1->3->6"]}
]

// root is of TreeNode Type
function binaryTreePaths(root) {
  var x = [];
  getPathForNode(root, x);
  var res = x.map(a => a.join("->"));
  return res;
}


getPathForNode = (node, x) => {
  if(node.hasLeftChild) {
    x = node.traverseNode(x, true);
    getPathForNode(node.left, x);
  }

  if(node.hasRightChild) {
    x = node.traverseNode(x, false);
    getPathForNode(node.right, x);
  }
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