document.getElementById('get-weather-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'ef67f2f9e9mshb2c18ba8120bce1p178b8cjsn982659f1cd45'; // Your RapidAPI key
    const apiHost = 'wft-geo-db.p.rapidapi.com';
    const searchApiUrl = `https://${apiHost}/v1/geo/cities?namePrefix=${cityInput}`;

    // Fetch city data from GeoDB Cities API
    fetch(searchApiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': apiHost,
            'X-RapidAPI-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-list').innerHTML = '';

            if (data.data && data.data.length > 0) {
                const cityList = document.getElementById('city-list');
                data.data.forEach(city => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${city.city}, ${city.country}`;
                    cityList.appendChild(listItem);
                });
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
            alert('An error occurred while fetching the city data.');
        });
});
