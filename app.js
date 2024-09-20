const apiKey = '0c41a3bf11bdcbc881699156f45e3c1a';
const weatherResult = document.getElementById('weatherResult');
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const loadingMessage = document.getElementById('loadingMessage');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        loadingMessage.style.display = 'block';
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found, please try again.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather data. Please check your internet connection.');
        console.log('Error:', error);
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;

    document.getElementById('cityName').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
    document.getElementById('description').textContent = `Description: ${description}`;
}
