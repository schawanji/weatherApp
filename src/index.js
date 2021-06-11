let units = `metric`;
let apiKey = `e4dfdc1dfbd9af8701deee7d18b22e9b`;

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentdate = new Date(date);
  let day = currentdate.getDay();
  let time = currentdate.toLocaleTimeString();
  return `${days[day]} ${time}`;
}

function displayDate(date) {
  let displayedDate = document.querySelector(`#currentDate`);
  displayedDate.innerHTML = `${formatDate(date)}`;
}

function getData(response) {
  let displayedCity = document.querySelector(`#city`);
  displayedCity.innerHTML = response.data.name;
  let temp = document.querySelector(`#temperature`);
  temp.innerHTML = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let displayedDescription = document.querySelector("#weather-description");
  displayedDescription.innerHTML = `${description}`;
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Harare&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(getData);

///////////////////////////////////////////////////////////////////////

function searchCity(event) {
  event.preventDefault();

  let inputForm = document.querySelector(`#input-form`);
  let searchCity = `${inputForm.value}`;
  searchCity = searchCity.trim();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getData);
}

function displayWeatherData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
function showCurrentLocation(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getData);
}

displayDate(new Date());

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", searchCity);

let homeButton = document.querySelector("#current-location");
homeButton.addEventListener("click", displayWeatherData);
