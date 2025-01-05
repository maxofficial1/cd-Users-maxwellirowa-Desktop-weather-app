// script.js

// Function to fetch weather data
async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data: ' + error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Event listener for form submission
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});
const citiesInGeorgia = ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Athens', 'Sandy Springs', 'Roswell', 'Albany', 'Johns Creek'];

async function getWeatherForAllCities() {
    const weatherPromises = citiesInGeorgia.map(city => getWeather(city));
    const weatherData = await Promise.all(weatherPromises);
    weatherData.forEach(data => displayWeather(data));
}

// Call the function to get weather for all cities in Georgia
getWeatherForAllCities();