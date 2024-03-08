require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db.config');


const app = express();
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Use sessions for persistent login sessions
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}));

// Middleware for Passport authentication
app.use(authMiddleware.initialize);

// Mount user routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
