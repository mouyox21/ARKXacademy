const express = require('express');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');

const USERS = [
  {
    username: "ismail",
    password: "supersecret",
  },
  {
    username: "someuser",
    password: "user",
  },
];

function isAuthenticated(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const user = jwt.verify(token, "your-secret-key");
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
}

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login',
    body('username').isLength({ min: 5 }).trim().escape(), 
    body('password').isLength({ min: 5 }).trim().escape(),  
    (req, res) => {
  // Validate and authenticate the user
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { username, password } = req.body;

  const user = USERS.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Cannot find user" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Password incorrect" });
  }

  // Generate JWT token upon successful authentication
  const token = jwt.sign({ username: username }, "your-secret-key", {
    expiresIn: "15s",
  });
  
  // Set JWT token as a cookie
  res.cookie('jwt', token, { httpOnly: true });
  
  res.redirect('/dashboard');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
