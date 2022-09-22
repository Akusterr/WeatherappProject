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

function submit(event) {
  event.preventDefault();
  let input = document.querySelector("#locationInput");
  let cityHeading = document.querySelector('#locationDisplay');
  cityHeading.innerHTML = input.value;
  search(input.value).then((cityWeatherData) => {
    console.log(cityWeatherData)
    let currentTempSpan = document.querySelector('#currentTemp');
    const temp_max = cityWeatherData.main.temp_max;
    const temp_min = cityWeatherData.main.temp_min;
    currentTempSpan.innerHTML = `${temp_min}℃/${temp_max}℃`
  })
}
////////////

function search(city) {
  let apiKey = "43a017c50cad44b78c7d2a1983f72803";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return axios.get(apiUrl).then((result) => result.data);
}



function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#locationDisplay");
currentLocation.addEventListener("click", getLocation);