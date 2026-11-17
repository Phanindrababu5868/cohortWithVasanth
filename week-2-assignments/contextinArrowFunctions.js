const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};

const friend = { userName: 'Candidate' };

profile.greet.call(friend); 
profile.welcome.call(friend);


//out put
    //Hi, I'm undefined
    //Welcome, Candidate

// Why?

//1. Arrow function (greet)

    //-> Arrow functions don't have their own this.

    //-> They take this from their parent scope.

    //-> .call(), .apply(), and .bind() cannot change their this.

    //-> So friend is ignored, and this.userName is undefined in this example.

//2. Normal function (welcome)

    //->Normal functions have their own this.

    //->.call(friend) changes this to the friend object.

    //->The friend object has userName: 'Candidate'.

// so final output is

    // Hi, I'm undefined
    // Welcome, Candidate


