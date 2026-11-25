//Question: Demonstrate a Higher-Order Component (HOC) in React.

//Answer:

//A Higher-Order Component (HOC) is a function that accepts other component as argument and returns enhanced component with out change the existing original component code

// const EnhanceComponent= higherOrderComponent(OriginalFunction) 

// here: 
// OriginalFunction is a component that we want enhance.
// higherOrderComponent is a function that takes Component and return enhanced component
// EnhanceComponent is a new componnet with additional functionality 


// example

function withloading(OriginalComponent){

    return function EnhanceComponent(isLoading,...props){
        if(isLoading){
            return <h1>Loading....</h1>
        }

        return <OriginalComponent {...props}/>
    }
}

function Users({users}){

    return <div>
        <h1>user Deatils</h1>

        {users.map((user,ind)=>(
            <p key={user?.id||`${ind}-${user?.name}`}>{user.name}</p>
        ))}
    </div>
}

const UserListWithLoading=withloading(Users)

function App(){

    let users=[
        {id:1,name:'ram'},
        {id:2,name:'sam'}
    ]

    return <UserListWithLoading isLoading={flase} users={users}/>

}

export default App