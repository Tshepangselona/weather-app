const apiKey = '0c41a3bf11bdcbc881699156f45e3c1a';  
const weatherResult = document.getElementById('weatherResult');
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');

searchButton.addEventListener('click', function() {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found, please try again.');
                return;
            }
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;

    document.getElementById('cityName').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
    document.getElementById('description').textContent = `Description: ${description}`;
}
