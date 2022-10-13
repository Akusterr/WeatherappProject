let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const apiKey = "43a017c50cad44b78c7d2a1983f72803";
const currentDay = days[now.getDay()];
const time = now.toLocaleTimeString();

const formattedDateString = `${currentDay} ${time}`;

const dateSpan = document.querySelector('#dateGoesHere')
dateSpan.innerHTML = formattedDateString

console.log(formattedDateString)
///////this part was removed to make the temp work on sandbox-Submit was "defined" too many times
function submit(event) {
  event.preventDefault();
  let input = document.querySelector("#locationInput");
  let cityHeading = document.querySelector("#locationDisplay");
  cityHeading.innerHTML = input.value;
}
///////
const cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", submit);

const fetchAndRenderCityWeatherData = (str) => {
  let cityHeading = document.querySelector('#locationDisplay');
  cityHeading.innerHTML = str;
  search(str).then((cityWeatherData) => {
    console.log(cityWeatherData)
    let currentTempSpan = document.querySelector('#currentTemp');
    const temp_max = cityWeatherData.main.temp_max;
    const temp_min = cityWeatherData.main.temp_min;
    currentTempSpan.innerHTML = `${temp_min}℃/${temp_max}℃`
    const weather = cityWeatherData.weather || [];
    const firstWeater = weather[0] || {};
    const icon = firstWeater.icon;
    let iconTarget = document.querySelector('#iconTarget');
    iconTarget.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />`

    const {deg, speed} = cityWeatherData.wind;
    document.querySelector('#windSpeed').innerHTML = `Speed: ${speed} mph`;
     document.querySelector('#windDirection').innerHTML = `Direction: ${deg}°`;
  })
}

const fetchAndRenderDailyWeatherDataForCity = (str) => {
  searchDailyForcast(str).then((dailyWeatherData) => {
    console.log('DAILYDATA', dailyWeatherData)
  })
}

const updateDailyForcastAndCityWeatherData = (city) => {
  fetchAndRenderCityWeatherData(city)
  // fetchAndRenderDailyWeatherDataForCity(city)
}

function submit(event) {
  event.preventDefault();
  let input = document.querySelector("#locationInput");
  
  updateDailyForcastAndCityWeatherData(input.value)
}
////////////

function search(city) {
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return axios.get(apiUrl).then((result) => result.data);
}

function searchDailyForcast(city) {
  let apiUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}&units=metric`;
  return axios.get(apiUrl).then((result) => result.data);
}



function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#locationDisplay");
currentLocation.addEventListener("click", getLocation);


updateDailyForcastAndCityWeatherData('Belmar');