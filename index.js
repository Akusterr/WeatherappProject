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

// OPEN WEATHER APP API KEY
// const apiKey = "43a017c50cad44b78c7d2a1983f72803";
//
const apiKey = '3801f5b9073d0t0a033o1536380c2af4'
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

const sampleApiResponse = {
   "city":"Lisbon",
   "country":"Portugal",
   "coordinates":{
      "longitude":-9.1365919,
      "latitude":38.7077507
   },
   "daily":[
      {
         "condition":{
            "description":"light rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":19.86,
            "minimum":17.64,
            "maximum":20.05,
            "humidity":77
         },
         "wind":{
            "speed":5.2
         },
         "time":1666353600
      },
      {
         "condition":{
            "description":"moderate rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":20.76,
            "minimum":17.6,
            "maximum":21,
            "humidity":78
         },
         "wind":{
            "speed":10.13
         },
         "time":1666440000
      },
      {
         "condition":{
            "description":"light rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":20.07,
            "minimum":17.86,
            "maximum":20.07,
            "humidity":66
         },
         "wind":{
            "speed":7.32
         },
         "time":1666526400
      },
      {
         "condition":{
            "description":"light rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":20.76,
            "minimum":17.66,
            "maximum":20.76,
            "humidity":66
         },
         "wind":{
            "speed":5.99
         },
         "time":1666612800
      },
      {
         "condition":{
            "description":"light rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":20.95,
            "minimum":18.13,
            "maximum":21.04,
            "humidity":79
         },
         "wind":{
            "speed":7.26
         },
         "time":1666699200
      },
      {
         "condition":{
            "description":"light rain",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
            "icon":"rain-day"
         },
         "temperature":{
            "day":20.56,
            "minimum":18.67,
            "maximum":20.56,
            "humidity":82
         },
         "wind":{
            "speed":5.97
         },
         "time":1666785600
      },
      {
         "condition":{
            "description":"overcast clouds",
            "icon_url":"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
            "icon":"broken-clouds-day"
         },
         "temperature":{
            "day":19.5,
            "minimum":17.1,
            "maximum":20.25,
            "humidity":79
         },
         "wind":{
            "speed":2.02
         },
         "time":1666872000
      }
   ]
}

const fetchAndRenderCityWeatherData = (str) => {
  let cityHeading = document.querySelector('#locationDisplay');
  cityHeading.innerHTML = str;
  search(str).then((cityWeatherData) => {
    console.log(cityWeatherData)
    const {daily} = cityWeatherData;
    const {
       temperature:{maximum, minimum},
       wind:{speed},
       condition: {icon_url, icon, description}
    } = daily.shift();
    let currentTempSpan = document.querySelector('#currentTemp');
    currentTempSpan.innerHTML = `${minimum}℃/${maximum}℃`
    let iconTarget = document.querySelector('#iconTarget');
    iconTarget.innerHTML = `<img  alt="${icon}" src="${icon_url}" />`
    document.querySelector('#windSpeed').innerHTML = `Speed: ${speed} mph`;
    document.querySelector('#condition').innerHTML = description;

    daily.forEach((weatherForDay, idx) => {
      const {
        temperature:{maximum, minimum},
        wind:{speed},
        condition: {icon_url, icon},
        time
      } = weatherForDay;

      const tempSpan = document.querySelector(`#weekday${idx}temp`);
      const dateStrong = document.querySelector(`#weekday${idx}day`);
      const iconSpan = document.querySelector(`#weekday${idx}icon`);

      // tempSpan.innerHTML = `${minimum}℃/${maximum}℃`;
      tempSpan.innerHTML = `
        <p class="tempText">${maximum}℃</p>
        <p class="tempText">${minimum}℃</p>
      `;
      const date = new Date();
      date.setTime(time * 1000) // time is in seconds so convert to miliseconds
      dateStrong.innerHTML = days[date.getDay()];

      iconSpan.innerHTML = `<img  alt="${icon}" src="${icon_url}" />`;
    })
  })
}

const fetchAndRenderDailyWeatherDataForCity = (str) => {
  searchDailyForcast(str).then((dailyWeatherData) => {
    console.log('DAILYDATA', dailyWeatherData)
  })
}

const updateDailyForcastAndCityWeatherData = (city) => {
  fetchAndRenderCityWeatherData(city)
}

function submit(event) {
  event.preventDefault();
  let input = document.querySelector("#locationInput");
  
  updateDailyForcastAndCityWeatherData(input.value)
}
////////////

function search(city) {
  // leaving open weather api url in here for now but using she codes API  
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
  return axios.get(apiUrl).then((result) => result.data);
}


function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#locationDisplay");
currentLocation.addEventListener("click", getLocation);


updateDailyForcastAndCityWeatherData('Belmar');