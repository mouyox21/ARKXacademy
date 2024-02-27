const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client.connect()
  .then(() => {
    console.log("Connected to the database");
    const db = client.db("mydb");
    const collection = db.collection("users");

    // Insertion de plusieurs utilisateurs
    const usersToAdd = [
      { name: "mouad", age: 23 },
      { name: "salma", age: 99 },
      { name: "Alice", age: 35 }
    ]; 
 
    collection.insertMany(usersToAdd)
      .then((result) => console.log("Users Created Successfully: ", result.insertedCount))
      .catch((error) => console.log("Error inserting users: ", error));

    // Recherche de tous les utilisateurs
    collection.find().toArray()
      .then((users) => console.log("All Users: ", users))
      .catch((error) => console.log("Error finding users: ", error));

  })
  .catch((error) => console.log("Error connecting to the database: ", error));
   