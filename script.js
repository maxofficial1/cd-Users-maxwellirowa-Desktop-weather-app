=document.getElementById('get-weather-btn').addEventListener('click', fetchWeather);
document.getElementById('city-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherApiKey = 'f716f862a52b41808bd514356664bfa3'; // Your OpenWeather API key
    const searchApiUrl = 'wft-geo-db.p.rapidapi.com'

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
           const rapidApiKey = 'a0896f271amsh7ca12bb74dd82abp11edd9jsn10b601892cf9'; // Your RapidAPI key
            const geoDbApiUrl = 'wft-geo-db.p.rapidapi.com';

            // Fetch state data from RapidAPI
            fetch(geoDbApiUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'document.getElementById('get-weather-btn').addEventListener('click', fetchWeather);
document.getElementById('city-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherApiKey = 'f716f862a52b41808bd514356664bfa3'; // Your OpenWeather API key
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${weatherApiKey}&units=imperial`;

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

            const rapidApiKey = 'ef6f72f9e9mshb2c18ba8120bce1p178b8cjsn982659f1cd45'; // Your RapidAPI key
            const geoDbApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${data.name}&countryIds=${data.sys.country}`;

            // Fetch state data from RapidAPI
            fetch(geoDbApiUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a0896f271amsh7ca12bb74dd82abp11edd9jsn10b601892cf9'
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            })
                .then(response => response.json())
                .then(geoData => {
                    if (geoData.data && geoData.data.length > 0) {
                        geoData.data.forEach(city => {
                            if (city.latitude === data.coord.lat && city.longitude === data.coord.lon) {
                                const cityList = document.getElementById('city-list');
                                const listItem = document.createElement('li');
                                listItem.textContent = `${city.city}, ${city.region}, ${city.country} - ${data.weather[0].description}, ${data.main.temp}°F`;
                                cityList.appendChild(listItem);
                            }
                        });
                    } else {
                        alert('State not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching state data:', error);
                    alert(error.message);
                });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message);
        });
}
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            })
                .then(response => response.json())
                .then(geoData => {
                    if (geoData.data && geoData.data.length > 0) {
                        geoData.data.forEach(city => {
                            if (city.latitude === data.coord.lat && city.longitude === data.coord.lon) {
                                const cityList = document.getElementById('city-list');
                                const listItem = document.createElement('li');
                                listItem.textContent = `${city.city}, ${city.region}, ${city.country} - ${data.weather[0].description}, ${data.main.temp}°F`;
                                cityList.appendChild(listItem);
                            }
                        });
                    } else {
                        alert('State not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching state data:', error);
                    alert(error.message);
                });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message);
        });
}
