// Create an array of user objects
let users = [
    { name: "John", age: 25 },
    { name: "Alic", age: 30 },
    { name: "Bobe", age: 28 }
  ];
  
  // Print the user objects
 const doubleage = users.map((users)=>users.age*2)
 console.log(doubleage);
  
 const double= users.map((users)=>({...users,age:users.age*2}))
 console.log(double);