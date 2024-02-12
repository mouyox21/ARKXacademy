const fs = require('fs-extra');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
        
    });
};


const generateUniqueID = async () => {
    let accountID;
    let test = 1001;
    do {
        accountID = `ACC${test}`;
        test++; 
    } while (await isDuplicateID(accountID));

    if (await isDuplicateID(accountID)) {
        console.log(`Account ID ${accountID} already exists.`);
    } else {
        console.log(`New account ID generated: ${accountID}`);
    }
    
    return accountID;
};

const isDuplicateID = async (accountID) => {
    try {
        const users = await fs.readJson('./data/users.json');
        return users.some(user => user.accountID === accountID);
    } catch (error) {
        console.error('Error checking duplicate ID:', error);
        return true; // Assume duplicate ID to prevent further processing
    }
};
const generateRandomPin = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
    prompt,
    generateUniqueID,
    isDuplicateID,
    generateRandomPin,
};
