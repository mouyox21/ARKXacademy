const readline = require("readline");
const events = require("events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const eventEmitter = new events.EventEmitter();

const result = [];

function prompt(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (userInput) => {
      resolve(userInput);
    });
  });
}

eventEmitter.on("createUser", async () => {
  const name = await prompt("What is your name?\n");
  const phoneNumber = await prompt("What's your phone number?\n");
  console.log(`-------------------------\nUser Added:\n Name: ${name}. \nNumber: ${phoneNumber}.\n-------------------------`);
  result.push({ name, phoneNumber });
  eventEmitter.emit("userCreated");
});

eventEmitter.on("findUser", async () => {
  const name = await prompt("Enter the name of the user you want to find: ");
  const user = result.find((user) => user.name === name);
  if (user) {
    console.log(
      `-------------------------\nUser found:\nName: ${user.name}\nPhone number: ${user.phoneNumber}\n-------------------------\n`
    );
  } else {
    console.log(">>>>>>>> User not found. <<<<<<<<<<<");
  }
  setTimeout(() => {
    eventEmitter.emit("showMenu");
  }, 1000); // Wait for 1 second before showing the menu
});

eventEmitter.on("processUsers", () => {
  console.log("\n\nUser Info:\n==================");
  result.forEach((user) => {
    console.log("----------------------------------------------------");
    console.log(`Name: ${user.name}`);
    console.log(`Phone number: ${user.phoneNumber}\n`);
    console.log("----------------------------------------------------");
  });
  setTimeout(() => {
    eventEmitter.emit("showMenu");
  }, 1000); // Wait for 1 second before showing the menu
});

eventEmitter.on("createMultipleUsers", async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    await new Promise((resolve, reject) => {
      eventEmitter.once("userCreated", resolve);
      eventEmitter.emit("createUser");
    });
  }
  setTimeout(() => {
    eventEmitter.emit("showMenu");
  }, 1000); // Wait for 1 second before showing the menu
});

eventEmitter.on("showMenu", () => {
  rl.question(
    "----------------------------------\nWhat would you like to do?\nADD. Add user\nFIND. Find user\nDISPLAY. Display all users\nEXIT. Exit\n----------------------------\nEnter your choice: ",
    (choice) => {
      switch (choice.toUpperCase()) {
        case "ADD":
          rl.question("How many users do you want to add? \n", (numUsers) => {
            eventEmitter.emit("createMultipleUsers", numUsers);
          });
          break;
        case "DISPLAY":
          eventEmitter.emit("processUsers");
          break;
        case "FIND":
          eventEmitter.emit("findUser");
          break;
        case "EXIT":
          rl.close();
          break;
        default:
          console.log("Invalid choice. Please enter ADD, FIND, DISPLAY, or EXIT.");
          eventEmitter.emit("showMenu");
      }
    }
  );
});

eventEmitter.emit("showMenu");
