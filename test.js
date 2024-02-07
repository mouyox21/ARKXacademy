const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let result=[]

function createUser(callback) {
  rl.question("What is your name? ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.question("What's your phone number? ", (phoneNumber) => {
      console.log(`Thank you, ${name}. Your phone number is ${phoneNumber}.`);
      result.push({ name, phoneNumber });
      callback(); 
    });
  });
}

for (let index = 0; index <3; index++) {
  rl.question("What is your name? ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.question("What's your phone number? ", (phoneNumber) => {
      console.log(`Thank you, ${name}. Your phone number is ${phoneNumber}.`);
      result.push({ name, phoneNumber });
  
}
)
rl.close()
