# Problem Statements


###### 01. Two Sum 
**######LEVEL - EASY**<br />
Given an array of integers, return indices of the two numbers such that they add up to a specific target. 
You may assume that each input would have exactly one solution, and you may not use the same element twice. 

Given nums = [2, 7, 11, 15], target = 9
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0,1]

<hr />


###### 02. 01 Matrix
**LEVEL - MEDIUM**<br />
Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell. 
The distance between two cells is 1. 

Conds: 
1. The number of elements of the given matrix will not exceed 10,000
2. There are at least one 0 in the given matrix 
3. The cells are adjacent in only four directions: up, down, left, right

<hr />

###### 03. H-Index
**LEVEL- MEDIUM**<br />
Given an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.

According to the definition of h-index on Wiki: "A scientist has index h if h of his/her N papers have at least h citations each, and the other N-h papers have no more than h citations each. 

For example, given 
```javascript
citations = [3, 0, 6, 1, 5]
```
, which means the researcher has **5** papers in total and each of them had recieved **3, 0, 6, 1, 5** citations respectively. Since the researcher has 3 papers with at least 3 citations each and the remaining two has no more than 3 citations each, his h-index is **3**

NOTE: if there are several possible values of h, the maximum one is taken as the h-index.

<hr />

###### 04.  2 Keys Keyboard
**LEVEL - EASY** <br />
Initially on a notepad, only one character 'A' is present. You can perform two operations on this notepad
for each step: 
* **Copy All**: You can copy all the characters present on the notepad (partial copy is not allowed).
* **Paste**: You can paste the characters which are copied last time.

Given a number 'n', you have to get exactly 'n' 'A's on the notepad by performing the minimum number of steps permitted. Output the minimum number of steps to get n 'A's.

<hr /> 

###### 05. Binary Tree Paths 
**LEVEL - MEDIUM** <br />
Given a binary tree, return all root-to-leaf paths. 
For example, given a binary tree 
``` javascript
    1
   / \
  2   3
  \
   5
``` 
All root-to-leaf paths are: 
["1->2->5", "1->3"]

<hr /> 