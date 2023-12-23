function search(event) {
  event.preventDefault();
  let searchbar = document.querySelector("#SearchInput");

  call(searchbar.value);
}
let searchinput = document.querySelector("#searchform");
searchinput.addEventListener("submit", search);
call("paris");
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
