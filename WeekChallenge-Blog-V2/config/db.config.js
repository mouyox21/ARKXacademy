const mongoose = require('mongoose');


// Connect to MongoDB database using Mongoose.
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);

  });

// Export the `mongoose` object
module.exports = mongoose;
