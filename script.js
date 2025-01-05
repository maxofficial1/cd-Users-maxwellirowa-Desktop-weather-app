document.getElementById('get-weather-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value;
    const searchApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityInput}`;

    fetch(searchApiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            'X-RapidAPI-Key': 'ef67f2f9e9mshb2c18ba8120bce1p178b8cjsn982659f1cd45'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            const cityList = document.getElementById('city-list');
            cityList.innerHTML = '';

            data.data.forEach(city => {
                const listItem = document.createElement('li');
                listItem.textContent = `${city.name}, ${city.country}`;
                cityList.appendChild(listItem);
            });
        } else {
            alert('City not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching city data:', error);
        alert('An error occurred while fetching the city data.');
    });
});
