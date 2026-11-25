// Question : What is the difference between classical and prototypal inheritance? Explain how you would extend a built-in object like Array.

// Answer

// classical inheritance : classical  is based on classes and objects. a class act as a blue print to create Objects and  a child inherites the all method and propertites from the parent class using extend key word  

// prototypal inheritance: prototypal inheritance is objects inheriting directly from the other Object. Every JavaScript object can have an internal prototype reference ([[Prototype]]) pointing to another object. When a property or method is accessed, JavaScript first looks for it on the object itself. If it doesn't find it, it searches up the prototype chain.

// javascript internally uses the prototypal inheritance internal, javaScript supports the classical inheritance but internal in convert that into prototypal inheritance 


class CustomrArray extends Array{
    first(){
        return this[0]
    }

    last(){
        return this[this.length-1]
    }

}

const arr=new CustomrArray(10,20,30,40,50)

console.log(arr.length) // from Array 
console.log(arr.first()) // from CustomrArray
console.log(arr.last()) // from CustomrArray