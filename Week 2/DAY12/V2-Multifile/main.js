const { createMultipleUsers, findUser, processUsers, rl } = require("./Challenge_Function copy");

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
          setTimeout(() => {
            showMenu();
          }, 2000);
          break;
        case "3":
          findUser(showMenu); // Pass showMenu as a callback function
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
