function search(event) {
  event.preventDefault();
  let searchbar = document.querySelector("#SearchInput");

  call(searchbar.value);
}
let searchinput = document.querySelector("#searchform");
searchinput.addEventListener("submit", search);
call("paris");
forecastdisplay();
function call(city) {
  let apiKey = `d860d36baeo33ebcafd4ec2d01tf4406`;
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiurl).then(exchange);
}
function exchange(response) {
  let temperatureElement = document.querySelector("#temperaturechange");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityelement = document.querySelector("#city");
  cityelement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formdate(date);
  let icon = document.querySelector("#temperatureicon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weathericon" />`;
  getForecast(response.data.city);
}
function formdate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function forecastdisplay(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(city) {
  let apiKey = "d860d36baeo33ebcafd4ec2d01tf4406";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(forecastdisplay);
}
