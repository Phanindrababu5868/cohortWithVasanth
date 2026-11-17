// Question: Imagine Uber is fetching data for 100 nearby drivers. 
// To avoid hitting API rate limits or crashing the browser with too many simultaneous requests, you must implement a "Batch Runner."

// Write a function promiseAllWithConcurrencyLimit that takes an array of "task functions" (functions that return a promise) and a limit limit. 
// It should execute no more than limit tasks at any given time. As soon as one task finishes, the next one in the queue should start.


/**
 * @param {Array<() => Promise<any>>} tasks - Array of functions returning promises
 * @param {number} limit - Maximum concurrent executions
 */
async function promiseAllWithConcurrencyLimit(tasks, limit) {
  // TODO: Your implementation
  if(limit<=0){
    throw new Error('Concurrency limit must be greater than 0')
  }

  let result= new Array(tasks.length)
  let nextIndex=0

  async function worker(){

    while(nextIndex<tasks.length){
        const currentIndex=nextIndex
        nextIndex++
        result[currentIndex]= await tasks[currentIndex]()
    }
  }

  let workers= Array.from({length:Math.min(limit,tasks.length)},()=>worker())

  await Promise.all(workers)

  return result
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () => 
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

const tasks = [
  createDriverTask(1, 1000),
  createDriverTask(2, 500),
  createDriverTask(3, 800),
  createDriverTask(4, 300),
  createDriverTask(5, 600),
];

// If limit is 2, Task 1 and 2 start. 
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 2).then(results => {
  console.log("All tasks completed:", results);
});