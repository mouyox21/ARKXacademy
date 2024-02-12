
const { findcity } =require("./Data.js")

console.log(findcity("Rabat"));

async function fetchWeather(input) {
    
    try {
        const city =  findcity(input)
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
        const data = await response.json();
        return {
            cityName: city.name,
            temperature: data.current_weather.temperature,
            temperatureUnits: data.current_weather_units.temperature
            
        };
    } catch (error) {
        throw new Error(`Failed to fetch weather data for ${city.name}: ${error.message}`);
    }
}

module.exports = { fetchWeather };
