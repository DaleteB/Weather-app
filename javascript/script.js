let newDate = new Date();

let date = document.querySelector("#date");

let hours = newDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = newDate.getMinutes();
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
let day = days[newDate.getDay()];

date.innerHTML = `${day} ${hours}:${minutes}`;

function searchForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  console.log(cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "8470682d02ce3ef83d09047bbc48b960";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchCity);
}
let buttonSubmit = document.querySelector("#submitCity");
buttonSubmit.addEventListener("click", searchForm);

function searchCity(response) {
  let temperature = Math.round(response.data.main.temp);
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

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8470682d02ce3ef83d09047bbc48b960";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(iAmHere);
}

function iAmHere(response) {
  let temperature = Math.round(response.data.main.temp);
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
