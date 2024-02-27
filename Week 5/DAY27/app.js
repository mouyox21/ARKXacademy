const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function createNewUser() {
  const newUser = new User({
    name: "Mike Ross",
    email: "mike.ross@arkx.group",
    age: 30,
  });
  try {
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
  } catch (error) {
    console.log("Error creating user:", error);
  }
}

async function fetchUsers() {
  try {
    const users = await User.find({});
    console.log("Fetched Users:", users);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
}

async function fetchUserByName(name) {
  try {
    const user = await User.findOne({ name });
    if (user) console.log("User found by name:", user);
    else console.log("User not found");
  } catch (error) {
    console.log("Error fetching user by name:", error);
  }
}

async function fetchUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    if (user) console.log("User found by email:", user);
    else console.log("User not found");
  } catch (error) {
    console.log("Error fetching user by email:", error);
  }
}

async function updateUserEmail(name, newEmail) {
  try {
    const user = await User.findOneAndUpdate(
      { name },
      { $set: { email: newEmail } }
    );
    if (user) console.log("User updated successfully:", user);
    else console.log("User not found");
  } catch (error) {
    console.log("Error updating user:", error);
  }
}

async function deleteUsersBeforeDate(date) {
  try {
    const result = await User.deleteMany({ createdAt: { $lt: date } });
    console.log(`Number of users deleted: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}

// Example usage
createNewUser();
fetchUsers();
fetchUserByName("Mike Ross");
fetchUserByEmail("mike.ross@arkx.group");
updateUserEmail("Mike Ross", "user@arkx.group");
const date = new Date();
deleteUsersBeforeDate(date);
