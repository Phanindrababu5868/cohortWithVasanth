function debounce(func, wait, immediate = false) {
  let timeout;
  // TODO: Logic to clear timeout and handle 'this' context
 function debounced(...args){
    let context=this 
    let callNow=immediate && !timeout
    clearTimeout(timeout)
    timeout=setTimeout(()=>{
        timeout=undefined
        if(!immediate) func.apply(context,args)
    },wait)

    if (callNow) func.apply(context, args);
  }

  return  debounced
}