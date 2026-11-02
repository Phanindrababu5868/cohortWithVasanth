// Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]

// Output: true

// Example 2:

// Input: nums = [1,2,3,4]

// Output: false

function containsDuplicate(nums) {
  // Your code here
  let counter={}
  for(let num of nums){
    if(counter[num]){
      return true
    }
    else{
      counter[num]=1
      }
    }
    
  return false

}