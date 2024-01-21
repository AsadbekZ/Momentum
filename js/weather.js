const COORDS_LS = "coords";
const API_KEY = "457b33bb49a59cb4ac4339b1888d5d23";
const weatherContainer = document.querySelector(".js-weather");

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=en`).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weatherContainer.innerText = `${Math.floor(temperature)}°C ${place}`;
    });
}

function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj))
}

function geoSuccessHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude,
        longitude
    }
    saveCoords(positionObj)
    getWeather(latitude, longitude);
}

function geoErrorHandler() {

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS); 
    if (coords === null) {
        askForCoords();
    } else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}

function init() {
    getCoords();
}

init();