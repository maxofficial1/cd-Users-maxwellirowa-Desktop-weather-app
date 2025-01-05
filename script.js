document.getElementById('get-weather-btn').addEventListener('click', function() {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'bb4ee3bfa2ebf2058942c20f19dc13e4'; // Your weather API key
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/find?q=${cityInput}&type=like&appid=${apiKey}`;

    fetch(searchApiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear the existing city list
            document.getElementById('city-list').innerHTML = '';

            data.list.forEach(city => {
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}`;
                
                fetch(weatherApiUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const cityList = document.getElementById('city-list');
                        const listItem = document.createElement('li');
                        listItem.textContent = `${city.name}, ${city.sys.country} - ${weatherData.weather[0].description}, ${Math.round(weatherData.main.temp - 273.15)}°C`;
                        cityList.appendChild(listItem);
                    })
                    .catch(error => console.error('Error fetching weather data for city:', error));
            });
        })
        .catch(error => console.error('Error fetching city data:', error));
});