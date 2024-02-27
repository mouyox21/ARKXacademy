const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true
}));

// Server Variable Structure
const users = [
  {
    username: 'alice',
    password: 'password' // Plain text password for demonstration (not recommended)
  }
];

// Registration Endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  users.push({ username, password });
  res.status(201).send('Registration successful.');
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const user = users.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid username or password.');
  }

  req.session.userId = user.username;
  res.cookie('sessionUser', username, { httpOnly: true });
  res.send('Login successful.');
})

// Protected Route
app.get('/protected', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized. Please login.');
  }
  res.send('Welcome to the protected route!\n '+req.session.userId+" --"+req.cookies.sessionUser);
  
});

// Logout Endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.send('Logout successful.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
