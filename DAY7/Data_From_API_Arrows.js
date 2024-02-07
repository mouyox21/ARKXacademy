const fs = require('fs');

const fetchData = async () => {
    try {
        const data = await fetch("https://dummyjson.com/users");
        const result = await data.json();
        return result.users;
    } catch (error) {
        console.log('FATAL ERROR: ', error.message);
    }
};
console.log(fetchData);
const MapsUser = async () => {
    try {
        const data = await fetchData();
        const names = data.map(item => item.firstName);
        const age = data.map(item => item.age);
        for (let i = 0; i < names.length; i++) {
            console.log(`Name : ${names[i]}\t ,Age: ${age[i]}`);
        }
    } catch (error) {
        console.log('Error: ', error.message);
    }
};

const ActiveUser = async () => {
    try {
        console.log("Processed Users: ");
        console.log("------------------------------------------------------------------");
        const data = await fetchData();
        const active = data.filter(item => item.gender == "male");
        const names = active.map(({ firstName, maidenName, lastName }) => `${firstName} ${maidenName} ${lastName}`);
        const age = active.map(item => item.age);
        const sum = active.reduce((accumulator, item) => accumulator + item.age, 0);
        for (let i = 0; i < active.length; i++) {
            console.log(`fullName : ${names[i]}\t\t\ ,Age: ${age[i]}`);
        }
        console.log("------------------------------------------------------------------");
        console.log("The total number of years old for men is :\t" + sum);
        console.log("The average of years old for men is :\t" + Math.floor(sum/active.length));
    } catch (error) {
        console.log('Error: ', error.message);
    } finally {
        console.log("------------------------------------------------------------------");
        summarizeAge();
    }
};

const summarizeAge = async () => {
    const data = await fetchData();
    const sum = data.reduce((accumulator, item) => accumulator + item.age, 0);
    console.log("The total number of years old is :\t" + sum);
};

ActiveUser();
