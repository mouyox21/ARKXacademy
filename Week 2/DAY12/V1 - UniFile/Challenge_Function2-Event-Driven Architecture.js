const readline = require("readline");
const EventEmitter = require("events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let result = [];
const eventEmitter = new EventEmitter();

eventEmitter.on("user Info", (name, phoneNumber) => {
  console.log(`-------------------------
User Added:node
Name: ${name}.
Number: ${phoneNumber}.
-------------------------`);
  result.push({ name, phoneNumber });
});

function createUser() {
  return new Promise((resolve, reject) => {
    rl.question("What is your name?\n", (name) => {
      rl.question("What's your phone number?\n", (phoneNumber) => {
        eventEmitter.emit("userAdded", name, phoneNumber);
        resolve();
      });
    });
  });
}

async function findUserByName(name) {
  return result.find((user) => user.name === name);
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

function findUser() {
  rl.question("Enter the name of the user you want to find: ", (name) => {
    findUserByName(name).then((user) => {
      if (user) {
        console.log(
          `-------------------------
User found:
Name: ${user.name}
Phone number: ${user.phoneNumber}
-------------------------`
        );
      } else {
        console.log("User not found.");
      }
      showMenu();
    });
  });
}

function showMenu() {
  rl.question(
    "----------------------------------\nWhat would you like to do?\n1. Add user\n2. Display all users\n3. Find user\n4. Exit\n----------------------------\nEnter your choice: ",
    (choice) => {
      switch (choice) {
        case "1":
          rl.question("How many users do you want to add? \n", (numUsers) => {
            createMultipleUsers(numUsers).then(() => {
              showMenu();
            });
          });
          break;
        case "2":
          processUsers();
          showMenu();
          break;
        case "3":
          findUser();
          showMenu();
          break;
        case "4":
          rl.close();
          break;
        default:
          console.log("Invalid choice. Please enter a number from 1 to 4.");
          showMenu();
      }
    }
  );
}
showMenu();

module.exports = { showMenu };
