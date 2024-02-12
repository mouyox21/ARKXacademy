const fs = require('fs');

async function fetchData() {
    try {
        const data = fs.readFileSync('./DAY7/data.json', 'utf-8');
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.log('FATAL ERROR: ', error.message);
    }
}

async function MapsUser () {
    try {
        const data = await fetchData();
        const names = data.map(item => item.name);
        const age = data.map(item => item.age)
        for (let i = 0; i < names.length; i++) {
          
        console.log(`Name : ${names[i]}\t ,Age: ${age[i]}`);
    }
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

//MapsUser();


async function ActiveUser () {
    try {
        console.log("Processed Users: ");
        const data = await fetchData();
        const active = data.filter(item => item.active==true);
        const names = active.map(item => item.name);
        const age = active.map(item => item.age)
        for (let i = 0; i < active.length; i++) {
          
        console.log(`Name : ${names[i]}\t ,Age: ${age[i]}`);
    }
    } catch (error) {
        console.log('Error: ', error.message);
    }finally{
        console.log("---------------------------------");
    }
}

//ActiveUser();

async function summarizeAge() {
    const data = await fetchData()
    const sum = data.reduce((accumulator, item) => accumulator + item.age, 0);
    console.log("The total number of years old is " + sum);
}
//summarizeAge();

async function fetchUserData (){
    ActiveUser()
    summarizeAge()

}
fetchUserData()