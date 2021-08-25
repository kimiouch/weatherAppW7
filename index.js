let apiKey = "c403a9e2a5c07086f36f15c109e2369a";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

let icons = {
    "day": {
        "clear sky": "./icons/day/clearday.png",
        "few clouds": "./icons/day/fewclouds.png",
        "scattered clouds": "./icons/cloud.png",
        "broken clouds": "./icons/manyclouds.png",
        "shower rain":"./icons/showerrain.png",
        "rain": "./icons/day/rainyday.png",
        "thunderstorm":"./icons/thunder.png",
        "snow": "./icons/snowy.png",
        "mist": "./icons/day/mistday.png",
    },
    "night": {
        "clear sky":"./icons/clearnight.png",
        "few clouds": "./icons/night/fewclouds.png",
        "scattered clouds": "./icons/cloud.png",
        "broken clouds": "./icons/manyclouds.png",
        "shower rain": "./icons/showerrain.png",
        "rain": "./icons/night/rainynight.png",
        "thunderstorm": "./icons/thunder.png",
        "snow": "./icons/snowy.png",
        "mist": "./icons/night/mistnight.png",
    }, 
}
function dayOrNight(time,sunrise,sunset){
if (time >  sunrise && time < sunset){
    return "day";
} else{
    return "night";
}

}
function today() {
    let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurseday",
        "Friday",
        "Saturday"
    ];

    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let day = `${weekdays[now.getDay()]}, ${hour}:${minute}`;

    return day;
}


function searchForCity(event) {
    event.preventDefault();

    let searchbox = document.querySelector(".type");

    axios
        .get(`${apiUrl}units=metric&q=${searchbox.value}&appid=${apiKey}`)
        .then(setCelsius);

    searchbox.value = "";
}
function setCelsius(response) {
    let cityheader = document.querySelector("#city");
    cityheader.innerHTML = response.data.name;

    let temprature = document.querySelector("#temp");
    celsiusTemp = response.data.main.temp;
    temprature.innerHTML = Math.round(celsiusTemp);

    let description = document.querySelector("#des");
    description.innerHTML = response.data.weather[0].description;

    let Humidity = document.querySelector("#humid");
    Humidity.innerHTML = response.data.main.humidity;

    let Wind = document.querySelector("#wind");
    Wind.innerHTML = response.data.wind.speed;

    let iconelement = document.querySelector("#icon");
    let calldayandnight = dayOrNight(response.data.dt, response.data.sunrise, response.data.sunset);
    iconelement.setAttribute("src", icons[calldayandnight][response.data.weather[0].description] );

    console.log(icons[calldayandnight])
    console.log(response.data.weather[0].description)

    let currrentTime = document.querySelector("#time");
    currrentTime.innerHTML = today(response.data.dt * 1000);

}

let searchButton = document.querySelector("button");
searchButton.addEventListener("click", searchForCity);

function searchLoation(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(
        currentPosition,
        currentPositionError
    );
}

function currentPositionError() {
    let position = {
        coords: {
            latitude: 51.5074,
            longitude: 0.1278
        }
    };
    currentPosition(position);
}

function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
        .get(`${apiUrl}units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(setCelsius);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchLoation);
