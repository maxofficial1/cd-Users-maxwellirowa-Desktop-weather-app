document.getElementById('get-weather-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'f716f862a52b41808bd514356664bfa3'; // Your OpenWeather API key
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;

    // Fetch weather data from OpenWeather
    fetch(searchApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('city-list').innerHTML = '';

            const cityList = document.getElementById('city-list');
            const listItem = document.createElement('li');
            listItem.textContent = `${data.name}, ${data.sys.country} - ${data.weather[0].description}, ${data.main.temp}°F`;
            cityList.appendChild(listItem);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message);
        });
});
