const { prompt } = require('./utils');
const { authenticateUser,signUp } = require('./authentication');
const { eventEmitter, EVENTS } = require('./eventHandlers');



const initialMenu = async () => {
    console.log('\nInitial Menu:');
    console.log('1. Log In');
    console.log('2. Sign Up');
    console.log('3. Exit');

    const choice = await prompt('Enter your choice: ');

    switch (choice) {
        case '1':
            try {
                const accountID = await prompt('Enter accountID: ');
                const pin = await prompt('Enter PIN: ');
                const user = await authenticateUser(accountID, pin);
                console.log('Authentication successful.');
                displayMenu(user);
            } catch (error) {
                console.error(error.message);
                initialMenu();
            }
            break;
        case '2':
                // Appel de la fonction de sign-up
                await signUp();
                initialMenu();
                break;
        case '3':
            process.exit();
            break;
        default:
            console.log('Invalid choice');
            initialMenu();
    }
};

const displayMenu = async (user) => {
    console.log('\nMain Menu:');
    console.log('1. Check Balance');
    console.log('2. Deposit');
    console.log('3. Withdraw');
    console.log('4. View Transactions');
    console.log('5. Exit');

    const choice = await prompt('Enter your choice: ');

    switch (choice) {
        case '1':
            eventEmitter.emit(EVENTS.CHECK_BALANCE, user);
            setTimeout(() => {
                displayMenu(user);   
            }, 1000);
            
            break;
        case '2':
            try {
                const depositAmount = parseFloat(await prompt('Enter deposit amount: '));
                eventEmitter.emit(EVENTS.DEPOSIT, user, depositAmount);
                setTimeout(() => {
                    displayMenu(user);   
                }, 1000);
                
            } catch (error) {
                console.error('Invalid amount');
                setTimeout(() => {
                    displayMenu(user);   
                }, 1000);
                
            }
            break;
        case '3':
            try {
                const withdrawAmount = parseFloat(await prompt('Enter withdrawal amount: '));
                eventEmitter.emit(EVENTS.WITHDRAW, user, withdrawAmount);
                setTimeout(() => {
                    displayMenu(user);   
                }, 1000);
                
            } catch (error) {
                console.error('Invalid amount');
                setTimeout(() => {
                    displayMenu(user);   
                }, 1000);
                
            }
            break;
        case '4':
            eventEmitter.emit(EVENTS.VIEW_TRANSACTIONS, user);
            setTimeout(() => {
                displayMenu(user);   
            }, 1000);
            
            break;
        case '5':
            process.exit();
            break;
        default:
            console.log('Invalid choice');
            displayMenu(user);
    }
};


module.exports = {
    initialMenu,
    displayMenu
};
