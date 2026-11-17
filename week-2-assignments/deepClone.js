function deepClone(value, map = new WeakMap()) {
  // 1. Base case: primitives and functions are returned as-is
  // (functions are treated as opaque values; they can't be meaningfully cloned)
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 2. Circular / shared references: return the clone we already made
  if (map.has(value)) {
    return map.get(value);
  }

  // Built-ins that need special construction
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    const re = new RegExp(value.source, value.flags);
    re.lastIndex = value.lastIndex;
    return re;
  }

  if (value instanceof Map) {
    const result = new Map();
    map.set(value, result); // register BEFORE recursing
    value.forEach((v, k) => {
      result.set(deepClone(k, map), deepClone(v, map));
    });
    return result;
  }

  if (value instanceof Set) {
    const result = new Set();
    map.set(value, result);
    value.forEach((v) => result.add(deepClone(v, map)));
    return result;
  }

  // 3. Arrays and plain objects
  const result = Array.isArray(value)
    ? new Array(value.length)
    : Object.create(Object.getPrototypeOf(value)); // preserves prototype / class instances

  // Register the clone BEFORE recursing, otherwise cycles recurse forever
  map.set(value, result);

  // Reflect.ownKeys covers string keys AND symbol keys
  for (const key of Reflect.ownKeys(value)) {
    const desc = Object.getOwnPropertyDescriptor(value, key);

    // Skip array "length": it's set automatically
    if (Array.isArray(value) && key === "length") continue;

    if ("value" in desc) {
      desc.value = deepClone(desc.value, map);
    }
    Object.defineProperty(result, key, desc);
  }

  return result;
}

// --- Test Cases ---
const original = {
  a: 1,
  b: { c: 2 },
  d: [11, 7],
};
original.self = original; // Circular reference!

const copy = deepClone(original);
console.log(copy !== original);       // true
console.log(copy.b !== original.b);   // true
console.log(copy.d !== original.d);   // true
console.log(copy.self === copy);      // true (circularity preserved)
console.log(copy.d);                  // [11, 7]

// Extra edge cases
const shared = { x: 1 };
const s = deepClone({ p: shared, q: shared });
console.log(s.p === s.q);             // true (shared references preserved, not duplicated)

const d = deepClone({ when: new Date(0), tags: new Set([1, 2]) });
console.log(d.when instanceof Date, d.tags instanceof Set); // true true