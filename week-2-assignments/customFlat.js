function customFlat(arr,depth=1){
    let res=[]

    for(let i=0;i<arr.length;i++){
        if(!(i in arr)) continue  // skip holes
        let element=arr[i]
        if(Array.isArray(element) && depth>0){
            let inner=customFlat(element,depth-1)
            for(let j=0;j<inner.length;j++){
                res.push(inner[i])
            }
        }
        else{
            res.push(arr[i])
        }
    }

    return res
}

console.log("Test 1:", customFlat([1, [2, [3, 4]]], 1));
console.log("Test 2:", customFlat([1, [2, [3, 4]]], 2));
console.log("Test 3:", customFlat([1, [2, 3]], 0));
console.log("Test 4:", customFlat([[1], [2, [3, [4]]]], Infinity));

// Expected output

// Test 1: [1, 2, [3, 4]]
// Test 2: [1, 2, 3, 4]
// Test 3: [1, [2, 3]]
// Test 4: [1, 2, 3, 4]