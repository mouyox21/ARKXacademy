const fs = require('fs-extra'); 

// Définition de la classe Transaction
class Transaction {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
        this.date = new Date().toISOString();
    }

    async saveTransaction(user) {
        try {
            let transactions = [];
            try {
                transactions = await fs.readJson('./data/transactions.json');
            } catch (error) {
                console.error('Error reading transactions:', error);
            }
            transactions.push({ accountID: user.accountID, ...this }); // Using 'this' instead of 'transaction'
            await fs.writeJson('./data/transactions.json', transactions);
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    }
    
    
}

module.exports = Transaction; // Export de la classe Transaction
