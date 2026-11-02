// Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. 
// You must solve it without using the division operator and in O(n) time.

// Example 1:

// Input: nums = [1,2,3,4]

// Output: [24,12,8,6]

// Example 2:

// Input: nums = [-1,1,0,-3,3]

// Output: [0,0,9,0,0]


function productExceptSelf(nums) {
  // Your code here
  // Do NOT use division!
  let res=[1]
  let prefix=1
  for(let i=1;i<nums.length;i++){
    prefix*=nums[i-1]
    res.push(prefix)
  }
  
  sufix=1
  for(let i=nums.length-1;i>=0;i--){
    res[i]*= sufix
    sufix*=nums[i]
  }
  
  return res
  

}

