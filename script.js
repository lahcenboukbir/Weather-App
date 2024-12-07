// OpenWeatherMap API URL and API key
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apiKey = "&appid=YOUR_API_KEY";

// DOM elements
const input = document.querySelector("input");
const button = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error p");

// Function to check the weather for a given city
async function checkWeather(city) {
  // Fetching weather data from the OpenWeatherMap API
  const response = await fetch(apiUrl + city + apiKey);

  // Handling different HTTP response statuses
  if (response.status == 404) {
    // Displaying an error message for an invalid city name
    error.innerHTML = "The city name is invalid.";
    error.style.cssText = "display: block";
  } else if (response.status == 400) {
    // Displaying an error message for an empty city input
    error.innerHTML = "Please enter a city name.";
    error.style.cssText = "display: block";
  } else {
    // Parsing the JSON response
    var data = await response.json();

    // Updating the weather information in the UI
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

    // Setting the weather icon based on weather conditions
    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.setAttribute("src", "./images/clear.png");
        break;

      case "Clouds":
        weatherIcon.setAttribute("src", "./images/clouds.png");
        break;

      case "Drizzle":
        weatherIcon.setAttribute("src", "./images/drizzle.png");
        break;

      case "Mist":
        weatherIcon.setAttribute("src", "./images/mist.png");
        break;

      case "Rain":
        weatherIcon.setAttribute("src", "./images/rain.png");
        break;

      case "Snow":
        weatherIcon.setAttribute("src", "./images/snow.png");
        break;
    }

    // Displaying the weather information
    document.querySelector(".weather").style.cssText = "display: block";
    // Clearing the error message
    error.innerHTML = "";
  }
}

// Event listener for the button click to check the weather
button.addEventListener("click", () => {
  checkWeather(input.value);
});
