// Given an integer array `nums`, find the subarray with the largest sum, and return its sum. 
// A subarray is a contiguous non-empty sequence of elements within the array.

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]

// Output: 6

// Explanation: The subarray [4,-1,2,1] has the largest sum = 6.

// Example 2:

// Input: nums = [1]

// Output: 1

// Explanation: The subarray [1] has the largest sum = 1.

// Example 3:

// Input: nums = [5,4,-1,7,8]

// Output: 23

// Explanation: The subarray [5,4,-1,7,8] has the largest sum = 23.

function maxSubArray(nums) {
  // Your code here
  let cumSum=0
  let maxSum=-Infinity
  for(let num of nums){
    cumSum+=num
    maxSum=Math.max(cumSum,maxSum)
    if(cumSum<0){
      cumSum=0
    }
  } 
  return maxSum

}