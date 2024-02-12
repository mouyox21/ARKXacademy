const http = require('http');
const url = require('url');
const { fetchWeather } = require('./Function');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('List of users');
    } else if (path === '/products') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('List of products');
        ////////////////////////////////////////////////////////////////////////::


    } else if (path === '/weather') {
        const cityName = parsedUrl.query.city;

        if (!cityName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('City name is missing in the query parameter');
            return;
        }

        try {
            const weatherData = await fetchWeather(cityName);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Weather information for ${weatherData.cityName}: Temperature is ${weatherData.temperature} ${weatherData.temperatureUnits}`);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching weather data');
        }
    } 
    /////////////////////////////////////////////////////////////////////////////////////////////:
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
