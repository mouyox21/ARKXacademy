const EventEmitter = require('events');
const fs = require('fs');


const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
  { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
];

const myevent = new EventEmitter();

myevent.on('Read', async input => {
    try {
        const weatherData = await afterRead(input);
        const txt = `City: ${weatherData.cityName}\nTemperature: ${weatherData.temperature} ${weatherData.temperatureUnits}`;
        console.log(txt);
        write(txt,weatherData.cityName);
    } catch (error) {
        console.log(`${error} ==> ${input} `);
        
    }
});

 const write=async(txt,city) =>{

    fs.unlink(`${city}.txt`, (err) => {
        if (err) {
          console.log('File unfound to delete:');
        } else {
          console.log('File deleted successfully.');
        }
      });



    await fs.writeFile(`${city}.txt`, txt, (err) => {
        if (err) {
          console.error('Error creating file:', err);
        } else {
          console.log('File created successfully.');
        }
      });
};

async function afterRead(cityName) {
    const city = cities.find(c => c.name === cityName);
    if (city) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${cityName}`);
        }
        const data = await response.json();
        return {
            cityName: city.name,
            temperature: data.current_weather.temperature,
            temperatureUnits: data.current_weather_units.temperature
        };
    } else {
        fs.unlink(`${cityName}.txt`, (err) => {
            if (err) {
              console.log('File unfound to delete:');
            } else {
              console.log('File deleted successfully.');
            }
          });
        // throw new Error('City not found');
        throw new Error('City not found');
    }
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
    } else {
        
        myevent.emit('Read', data);
    }
});
