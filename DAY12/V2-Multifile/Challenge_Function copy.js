const readline = require("readline");
const showMenu=require("./main")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let result = [];

function createUser() {
  return new Promise((resolve, reject) => {
    rl.question("What is your name?\n", (name) => {
      rl.question("What's your phone number?\n", (phoneNumber) => {
        console.log(`-------------------------\nUser Added:\n Name: ${name}. \nNumber: ${phoneNumber}.\n-------------------------`);
        result.push({ name, phoneNumber });
        resolve();
      });
    });
  });
}

async function findUserByName(name) {
  return result.find((user) => user.name.include(name) || user.phoneNumber === name);
}

async function createMultipleUsers(numUsers) {
  for (let i = 0; i < numUsers; i++) {
    await createUser();
  }
}

async function processUsers() {
  console.log("\n\nUser Info:\n==================");
  result.forEach((user) => {
    console.log("----------------------------------------------------");
    console.log(`Name: ${user.name}`);
    console.log(`Phone number: ${user.phoneNumber}\n`);
    console.log("----------------------------------------------------");
  });
}

function findUser(callback) {
  rl.question("Enter the name OR Phone Numbers of the user you want to find: ", (name) => {
    findUserByName(name).then((user) => {
      if (user) {
        console.log(
          `-------------------------\nUser found:\nName: ${user.name}\nPhone number: ${user.phoneNumber}\n-------------------------\n`
        );
      } else {
        console.log("User not found.");
      }
      if (callback) {
        setTimeout(() => {
          callback();
        }, 2000); 
      }
    });
  });
}




module.exports = {findUser,createMultipleUsers,processUsers,rl}