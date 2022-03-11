function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
     <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
     <img src="https://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png" alt=" " width="42" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "8470682d02ce3ef83d09047bbc48b960";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8470682d02ce3ef83d09047bbc48b960";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitForecastMax = document.querySelector(
    "#weather-forecast-temperature-max"
  );
  let fahrenheitForecastMin = document.querySelector(
    "#weather-forecast-temperature-min"
  );
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitForecastMax.innerHTML = Math.round(fahrenheitForecastMax);
  fahrenheitForecastMin.innerHTML = Math.round(fahrenheitForecastMin);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temp");
  let celsiusForecastMax = document.querySelector(
    "#weather-forecast-temperature-max"
  );
  let celsiusForecastMin = document.querySelector(
    "#weather-forecast-temperature-min"
  );
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusForecastMax.innerHTML = Math.round(celsiusForecastMax);
  celsiusForecastMin.innerHTML = Math.round(celsiusForecastMin);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener(
  "click",
  displayFahrenheitTemperature,
  displayForecast
);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener(
  "click",
  displayCelsiusTemperature,
  displayForecast
);

search("Lisbon");

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8470682d02ce3ef83d09047bbc48b960";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(iAmHere);
}

function iAmHere(response) {
  let temperature = Math.round(celsiusTemperature);
  let location = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${location}`;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;

  let description = response.data.weather[0].main;
  let descriptionNow = document.querySelector("#description");
  descriptionNow.innerHTML = description;

  let humidity = Math.round(response.data.main.humidity);
  let humi = document.querySelector("#humidity");
  humi.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let windy = document.querySelector("#wind");
  windy.innerHTML = `${wind}`;
}
let buttonRequest = document.querySelector("#requestLocation");
buttonRequest.addEventListener("click", getPosition);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
