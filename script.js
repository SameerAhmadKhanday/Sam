document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const cityNameElement = document.getElementById("cityName");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const forecastContainer = document.getElementById("forecastContainer");

    searchButton.addEventListener("click", function () {
        const city = searchInput.value;
        
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        const apiKey = "2e1d68d0f2200ef43c463c5d7eb46dc4"; // Replace with your OpenWeatherMap API key
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            const currentWeather = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            displayCurrentWeather(currentWeather);
            displayForecast(forecastData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function displayCurrentWeather(data) {
        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    }

    function displayForecast(data) {
        forecastContainer.innerHTML = "";
        const forecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const temperature = forecast.main.temp.toFixed(1);

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
                <p>${day}</p>
                <p>${temperature}°C</p>
            `;

            forecastContainer.appendChild(forecastItem);
        });
    }
});
