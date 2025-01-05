document.getElementById('get-weather-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = '7f716f862a52b41808bd514356664bfa3'; // Your OpenWeather API key
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;

    // Fetch weather data from OpenWeather
    fetch(searchApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-list').innerHTML = '';

            if (data.name && data.main.temp) {
                const cityList = document.getElementById('city-list');
                const listItem = document.createElement('li');
                listItem.textContent = `${data.name}, ${data.sys.country} - ${data.weather[0].description}, ${data.main.temp}°F`;
                cityList.appendChild(listItem);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data.');
        });
});
