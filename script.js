document.getElementById('get-weather-btn').addEventListener('click', function() {
    const cityInput = document.getElementById('city-input').value;
    const weatherApiKey = 'bb4ee3bfa2ebf2058942c20f19dc13e4'; // Your weather API key
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/find?q=${cityInput}&type=like&appid=${weatherApiKey}`;

    fetch(searchApiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear the existing city list
            document.getElementById('city-list').innerHTML = '';

            data.list.forEach(city => {
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${weatherApiKey}`;

                fetch(weatherApiUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        getState(city.name, city.sys.country).then(state => {
                            const cityList = document.getElementById('city-list');
                            const listItem = document.createElement('li');
                            listItem.textContent = `${city.name}, ${state}, ${city.sys.country} - ${weatherData.weather[0].description}, ${Math.round(weatherData.main.temp - 273.15)}°C`;
                            cityList.appendChild(listItem);
                        }).catch(error => console.error('Error fetching state data for city:', error));
                    })
                    .catch(error => console.error('Error fetching weather data for city:', error));
            });
        })
        .catch(error => console.error('Error fetching city data:', error));
});

function getState(cityName, country) {
    const geoDbApiKey = '7a881ed1-e246-40c7-83d1-f4c656e7bb6';
    const geoDbApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}&countryIds=${country}&limit=1`;

    return fetch(geoDbApiUrl, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': geoDbApiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data.length > 0) {
            return data.data[0].region;
        } else {
            throw new Error('City not found in GeoDB.');
        }
    })
    .catch(error => console.error('Error fetching state data:', error));
}