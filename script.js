document.getElementById('get-weather-btn').addEventListener('click', function() {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the weather information for the first matching city
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
            document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;

            // Clear the existing city list
            document.getElementById('city-list').innerHTML = '';

            // Fetch and display all matching cities with the same name
            displayMatchingCities(cityInput, data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

function displayMatchingCities(cityName, weatherCondition) {
    const cities = ['Duluth, US', 'Duluth, MN', 'Duluth, GA']; // Example cities list
    const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key

    cities.forEach(city => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.weather[0].main === weatherCondition && data.name.toLowerCase() === cityName.toLowerCase()) {
                    const cityList = document.getElementById('city-list');
                    const listItem = document.createElement('li');
                    listItem.textContent = `${data.name}, ${data.sys.country} - ${data.weather[0].description}, ${Math.round(data.main.temp - 273.15)}°C`;
                    cityList.appendChild(listItem);
                }
            })
            .catch(error => console.error('Error fetching weather data for city:', error));
    });
}