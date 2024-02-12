// main.js
const { selectRandomCity, cities } = require('./Data');
const { fetchWeather } = require('./Function');

async function main() {
    try {
        const randomCity = selectRandomCity(cities);
        const weatherData = await fetchWeather(randomCity);
        console.log(`Temperature in ${weatherData.cityName}: ${weatherData.temperature} ${weatherData.temperatureUnits}`);
    } catch (error) {
        console.error(error.message);
    }
}

main();
