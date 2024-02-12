const EventEmitter = require('events');
const fs = require('fs-extra');
const Transaction = require('./classes');
const eventEmitter = new EventEmitter();



const EVENTS = {
    CHECK_BALANCE: 'checkBalance',
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    VIEW_TRANSACTIONS: 'viewTransactions',
    UPDATE_USER_DATA: 'updateUserData'
};

eventEmitter.on(EVENTS.CHECK_BALANCE, async (user) => {
    console.log(`Current balance: ${user.balance}`);
});

eventEmitter.on(EVENTS.DEPOSIT, async (user, amount) => {
    user.balance += amount;
    const depositTransaction = new Transaction('deposit', amount);
    user.transactions.push(depositTransaction);
    depositTransaction.saveTransaction(user)
    await updateUser(user);
    console.log(`Deposit of ${amount} successful.`);
});

eventEmitter.on(EVENTS.WITHDRAW, async (user, amount) => {
    if (user.balance >= amount) {
        user.balance -= amount;
        const withdrawTransaction = new Transaction('withdrawal', amount);
        user.transactions.push(withdrawTransaction);
        await withdrawTransaction.saveTransaction(user);
        await updateUser(user);
        console.log(`Withdrawal of ${amount} successful.`);
    } else {
        console.log('Insufficient funds.');
    }
});

eventEmitter.on(EVENTS.VIEW_TRANSACTIONS, async (user) => {
    console.log('Transaction History:');
    user.transactions.forEach(transaction => {
        console.log(`${transaction.date} - ${transaction.type}: ${transaction.amount}`);
    });
});

const updateUser = async (user) => {
    try {
        const users = await fs.readJson('./data/users.json');
        const index = users.findIndex(u => u.accountID === user.accountID);
        if (index !== -1) {
            users[index] = user;
            await fs.writeJson('./data/users.json', users);
        } else {
            throw new Error('User not found.');
        }
    } catch (error) {
        throw new Error('Error updating user data.');
    }
};





module.exports = {
    eventEmitter,
    EVENTS
};
