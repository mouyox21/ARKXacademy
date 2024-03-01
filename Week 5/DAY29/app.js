require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route');

const app = express();
const port =3000;
const uri = process.env.MONGODB_URI;

app.use(express.json())

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });

app.use('/', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});