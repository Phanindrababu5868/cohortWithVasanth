function isDeepEqual(obj1, obj2) {
  
  // 1. Check if same reference
  if(obj1===obj2) {return true}

  // 2. Type checks: anything non-object (or null) that failed === is unequal
  if (
    typeof obj1 !== 'object' || obj1 === null ||
    typeof obj2 !== 'object' || obj2 === null
  ) {
    return false;
  }


  // NaN is the only value not equal to itself
  if(Number.isNaN(obj1) && Number.isNaN(obj2)){
    return false
  }

  // Array vs plain object mismatch
  if(Array.isArray(obj1) !== Array.isArray(obj2)) {return false}

  // Dates compare by time value
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }


  // 3. Recursive key-by-key comparison
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
    if (!isDeepEqual(obj1[key], obj2[key])) return false;
  }

  return true;

}

// --- Test Cases ---
const profileA = { name: "Vasanth", roles: ["admin", "mentor"], meta: { id: 1 } };
const profileB = { name: "Vasanth", roles: ["admin", "mentor"], meta: { id: 1 } };
const profileC = { name: "Vasanth", roles: ["admin"], meta: { id: 1 } };

console.log("Test 1 (Identical):", isDeepEqual(profileA, profileB)); // Expected: true
console.log("Test 2 (Different Roles):", isDeepEqual(profileA, profileC)); // Expected: false
console.log("Test 3 (Nested Change):", isDeepEqual(profileA, {...profileB, meta: { id: 2 } })); // Expected: false
console.log("Test 4 (Primitive):", isDeepEqual(10, 10)); // Expected: true