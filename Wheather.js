const apiKey = '34177d78c3722615983f026c0d279918'; // Replace with your OpenWeatherMap API key

// Fetch weather data for a given location
async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        console.log(data); // Debugging line to see the raw data
        
        if (data.cod !== 200) {
            weatherDataDiv.innerHTML = `Error: ${data.message}`;
            return;
        }

        const weather = `
            <h2>${data.name}</h2>
            <p>Latitude: ${data.coord.lat}</p>
            <p>Longitude: ${data.coord.lon}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherDataDiv.innerHTML = weather;

    } catch (error) {
        weatherDataDiv.innerHTML = 'Error fetching data';
    }
}

// Get weather data for user's current location
async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            const weatherDataDiv = document.getElementById('weatherData');
            weatherDataDiv.innerHTML = 'Loading...';

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                
                console.log(data); // Debugging line to see the raw data
                
                if (data.cod !== 200) {
                    weatherDataDiv.innerHTML = `Error: ${data.message}`;
                    return;
                }

                const weather = `
                    <h2>${data.name}</h2>
                    <p>Latitude: ${lat}</p>
                    <p>Longitude: ${lon}</p>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                weatherDataDiv.innerHTML = weather;

            } catch (error) {
                weatherDataDiv.innerHTML = 'Error fetching data';
            }
        }, (error) => {
            console.error(error); // Debugging line to see geolocation errors
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}
