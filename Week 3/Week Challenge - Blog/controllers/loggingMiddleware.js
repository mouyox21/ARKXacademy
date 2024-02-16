// middleware/loggingMiddleware.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../log.txt');

const loggingMiddleware = (req, res, next) => {
    const logMessage = `${new Date().toLocaleString()} - ${req.method} ${req.path}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
};

module.exports = loggingMiddleware;
