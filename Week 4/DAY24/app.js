const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const flash = require('express-flash');

const app = express();
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser());
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configure session management
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure serialization and deserialization of user data
const users = require('./Users.json');
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  const user = users.find(user => user.username === username);
  done(null, user);
});

// Registration Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('error', 'Email and password are required.');
    return res.redirect('/register');
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id= Date.now().toString()
    const newUser = { id:id , username, password: hashedPassword };
    users.push(newUser);
    await fs.writeFile('./Users.json', JSON.stringify(users));
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user.');
  }
});

// Login Route
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/dashboard',
  failureFlash: true 
}), (req, res) => {
  req.session.userId = req.user.username;
  res.cookie('sessionUser', req.user.username, { httpOnly: true });    
});

// Render Login Page
app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// Render Register Page
app.get('/register', (req, res) => {
  res.render('register');
});

// Dashboard Route
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('index', { name: req.user.username });
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.redirect('/login');
});

// Local Authentication Strategy
passport.use(new LocalStrategy(async function(username, password, done) {
  const user = users.find(user => user.username === username);
  if (!user) {
    return done(null, false, { message: 'Invalid username or password.' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return done(null, false, { message: 'Invalid username or password.' });
  }

  return done(null, user);
}));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
