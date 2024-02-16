// app.js
const express = require('express');
const loggingMiddleware = require('./controllers/loggingMiddleware');
const errorMiddleware = require('./controllers/errorMiddleware');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/posts', postRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
