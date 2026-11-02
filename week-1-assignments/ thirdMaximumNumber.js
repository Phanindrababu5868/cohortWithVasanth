// You are given an integer array nums.

// Return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

// Example 1:

// Input: nums = [3,2,1]
// Output: 1
// Explanation:
// The first distinct maximum is 3.
// The second distinct maximum is 2.
// The third distinct maximum is 1.

var thirdMax = function(nums) {
    let firstMax=-Infinity
    let secondMax=-Infinity
    let thirdMax=-Infinity

    for(let i=0;i<nums.length;i++){
        let num=nums[i]
        
        if (num === firstMax || num === secondMax || num === thirdMax) {
            continue;
        }

        if(num>firstMax){
            thirdMax=secondMax
            secondMax=firstMax
            firstMax=num
        }
        else if(num>secondMax){
            thirdMax=secondMax
            secondMax=num
        }
        else if(num>thirdMax){
            thirdMax=num
        }
    }

    return thirdMax===-Infinity ? firstMax:thirdMax
};