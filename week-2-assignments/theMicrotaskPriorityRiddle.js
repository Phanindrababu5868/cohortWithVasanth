console.log('1 - Sync');

setTimeout(() => {
  console.log('2 - Macrotask');
}, 0);

async function asyncFn() {
  console.log('3 - Inside Async');
  await Promise.resolve();
  console.log('4 - After Await');
}

asyncFn();

Promise.resolve().then(() => {
  console.log('5 - Microtask');
});

console.log('6 - Sync End');

// out out 

// 1 - Sync
// 3 - Inside Async
// 6 - Sync End
// 4 - After Await
// 5 - Microtask
// 2 - Macrotask

// Why

// the event loop follow priority  sync code -> micro stack (example:- promises) -> macro stack (timer,dome events)

//1. when execution start  will log '1 - Sync' 

// 2. setTimer is register in macrotask 

// 3. asyncFn() is called  and log '3 - Inside Async' , The function pauses at await. The code after await is scheduled as a microtask.

// 4. Promise.resolve() is registerd in micro stack

// 5. '6 - Sync End' logs

// 6. event loop  now exicute the  

        //execute promises(micro stack first)
            // so that logs "4 - After Await" and then follows  "5 - Microtask"

        //  execute timer (macro stack)
            // so it logs (2 - Macrotask)


