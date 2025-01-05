document.getElementById('get-weather-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'ef67f2f9e9mshb2c18ba8120bce1p178b8cjsn982659f1cd45'; // Your RapidAPI key
    const apiHost = 'us-weather-by-city.p.rapidapi.com';
    const searchApiUrl = `https://${apiHost}/getweather?city=${cityInput}`;

    // Fetch weather data from RapidAPI
    fetch(searchApiUrl, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            // Clear the city list
            document.getElementById('city-list').innerHTML = '';

            if (data.city && data.temperature) {
                const cityList = document.getElementById('city-list');
                const listItem = document.createElement('li');
                listItem.textContent = `${data.city}, ${data.state}, ${data.country} - ${data.condition}, ${data.temperature}°F`;
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
