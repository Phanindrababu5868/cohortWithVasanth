// Question: What will be logged? How do you fix this using the spread operator while keeping the code readable?



const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {...state };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city); 


// output :- Chennai

// why?

    // -> The spread operator (...state) creates only a shallow copy of the object.

    // newState is a new object.

    // newState.user still references the same nested object as state.user.

    // Therefore, modifying newState.user.details.city also modifies state.user.details.city.


// Fix 

// use nested spread operater (on each level) 


const newState = {...state,
    user:{
        ...state.user,
        details:{...state.user.details,
            city:"Chennai"
        }
    }
 };