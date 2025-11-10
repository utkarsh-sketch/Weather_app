const inputBox = document.querySelector('.input-box');
const searchbtn = document.querySelector('#searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');

const location_not_found = document.querySelector('.location_not_found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
  const api_key = "883265015729cd8e4b40cc345db7caff";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  const weather_data = await fetch(url).then(response => response.json());

  console.log(weather_data);

  // --- Handle error case ---
  if (weather_data.cod == '404') {
    location_not_found.style.opacity = "1";
    location_not_found.style.visibility = "visible";
    weather_body.style.opacity = "0";
    weather_body.style.visibility = "hidden";
    console.log("City not found!");
    return;
  }

  // --- Hide error and show weather info ---
  location_not_found.style.opacity = "0";
  location_not_found.style.visibility = "hidden";
  weather_body.style.opacity = "1";
  weather_body.style.visibility = "visible";

  temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
  description.innerHTML = weather_data.weather[0].description;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

  switch (weather_data.weather[0].main) {
    case 'Clouds':
      weather_img.src = "./assets/cloud.png";
      break;
    case 'Clear':
      weather_img.src = "./assets/clear.png";
      break;
    case 'Rain':
      weather_img.src = "./assets/rain.png";
      break;
    case 'Mist':
      weather_img.src = "./assets/mist.png";
      break;
    case 'Snow':
      weather_img.src = "./assets/snow.png";
      break;
    default:
      weather_img.src = "./assets/cloud.png";
  }
}

searchbtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") checkWeather(city);
});