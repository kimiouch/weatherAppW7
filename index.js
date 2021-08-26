let apiKey = "c403a9e2a5c07086f36f15c109e2369a";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

let icons = {

    "01d": "./icons/day/clearday.png",
    "02d": "./icons/day/fewclouds.png",
    "03d": "./icons/cloud.png",
    "04d": "./icons/manyclouds.png",
    "09d":"./icons/showerrain.png",
    "10d": "./icons/day/rainyday.png",
    "11d":"./icons/thunder.png",
    "13d": "./icons/snowy.png",
    "50d": "./icons/day/mistday.png",

    
    "01n":"./icons/clearnight.png",
    "02n": "./icons/night/fewclouds.png",
    "03n": "./icons/cloud.png",
    "04n": "./icons/manyclouds.png",
    "09n": "./icons/showerrain.png",
    "10n": "./icons/night/rainynight.png",
    "11n": "./icons/thunder.png",
    "13n": "./icons/snowy.png",
    "50n": "./icons/night/mistnight.png",
   
}


// function dayOrNight(time,sunrise,sunset){
//     console.log(new Date(time), new Date(sunset), new Date(sunrise))
// if (time >  sunrise && time < sunset){
//     return "day";
// } else{
//     return "night";
// }
//}


function today(timestamp) {
    let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurseday",
        "Friday",
        "Saturday"
    ];

    let now = new Date(timestamp);

    let hour = now.getUTCHours();
    let minute = now.getUTCMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let day = `${weekdays[now.getUTCDay()]}, ${hour}:${minute}`;

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
   // let calldayandnight = dayOrNight(response.data.dt, response.data.sunrise, response.data.sunset);
    iconelement.setAttribute("src", icons[response.data.weather[0].icon]);

    
    let currrentTime = document.querySelector("#time");
    currrentTime.innerHTML = today( (response.data.dt + response.data.timezone) * 1000);

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
