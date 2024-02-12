const fs = require('fs-extra');
const { prompt,
    generateUniqueID,
    generateRandomPin, } = require('./utils');
const {
        initialMenu,
        displayMenu,
    } = require('./operations');



const addUser = async (name, initialBalance = 0) => {
    const accountID = await generateUniqueID(); // Wait for the unique ID generation
    const pin = generateRandomPin();

    const newUser = {
        accountID,
        name,
        pin,
        balance: initialBalance,
        transactions: []
    };

    try {
        const users = await fs.readJson('./data/users.json');
        users.push(newUser);
        await fs.writeJson('./data/users.json', users);
        return newUser;
    } catch (error) {
        throw new Error('Error adding user.');
    }
};

const authenticateUser = async (accountID, pin) => {
    try {
        const users = await fs.readJson('./data/users.json');
        const user = users.find(u => u.accountID === accountID && u.pin.toString() === pin);
        if (user) {
            return user;
        } else {
            throw new Error('Invalid accountID or pin.');
        }
    } catch (error) {
        throw new Error('Error authenticating user.');
    }
};

const signUp = async () => {
    try {
        const name = await prompt('Enter your name: ');
        const initialBalance = parseFloat(await prompt('Enter initial balance: '));
        const newUser = await addUser(name, initialBalance);
        console.log('User created successfully!');
        console.log('Your account ID is:', newUser.accountID);
        console.log('Your PIN is:', newUser.pin);
        
        
    } catch (error) {
        console.error('Error signing up:', error.message);
        
        
    }
};


module.exports = {
    addUser,
    authenticateUser,
    signUp 
};
