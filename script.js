// Function to fetch weather data
async function getWeather(city) {
    const apiKey = 'f716f862a52b41808bd514356664bfa3'; // Your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data: ' + error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');

    cityName.innerText = `Weather in ${data.name}`;
    temperature.innerText = `Temperature: ${data.main.temp.toFixed(1)}°F`;
    weatherDescription.innerText = `Weather: ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}`;
}

// Event listener for the Get Weather button
document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// ✅ Event listener for pressing the Enter key
document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('get-weather-btn').click();
    }
});
