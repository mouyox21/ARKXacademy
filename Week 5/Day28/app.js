// app.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/day28Challenge")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Use product routes
app.use('/', productRoutes);

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
