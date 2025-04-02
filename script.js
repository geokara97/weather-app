const apiKEY='3fb13069f02493215234aad05dabe82c';
const apiUrl='https://api.openweathermap.org/data/2.5/weather';


const locationInput=document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement=document.getElementById("feels-like");
const descriptionElement = document.getElementById('description');
const windSpeed=document.getElementById("wind-speed");
const windGust=document.getElementById("wind-gust");
const windDegree=document.getElementById("wind-degree");
const humidity=document.getElementById("humidity");
const pressure =document.getElementById("pressure");
const weatherIcon=document.getElementById("weather-icon");



searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        document.getElementById("more-info").style.display = "grid";
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.style.display = 'block';
            document.getElementById('weather-icon').src = iconUrl;
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            feelsLikeElement.textContent=`${data.main.feels_like} °C`;
            windSpeed.textContent=`${data.wind.speed} m/s`;
            windGust.textContent=`${data.wind.gust} m/s`;
            windDegree.textContent=`${data.wind.deg}°`;
            humidity.textContent=`${data.main.humidity}%`;
            pressure.textContent=`${data.main.pressure} hPa`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}