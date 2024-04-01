require('dotenv').config()
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connect = require('./config/db_config');
const authRouter = require('./api/routes/auth.route');
const postRouter = require('./api/routes/post.route');
const userRouter = require('./api/routes/user.route');
const cors = require("cors");


const app = express();
const PORT = process.env.SERVER_PORT || 3001;
app.use(cors({
  origin: '*  '
}))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session management
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION, // Secret key used to sign the session ID cookie
        resave: false, // Whether to save the session for every request, even if it hasn't changed
        saveUninitialized: true, // Whether to save uninitialized sessions (new but not modified)
        cookie: {
          maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
          secure: false, // Set to true if your app is served over HTTPS
          httpOnly: true // Ensures that the cookie is only accessible via HTTP(S) and not JavaScript
          // Other cookie options...
        }
      })
);

require('./config/passport_config');

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define tha Main function
async function main() {
    await connect();

    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();