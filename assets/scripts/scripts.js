// GLOBALS --------------------------------------------------------------------------------

// Searchbar
const searchBar = document.getElementById('searchLoc');

// Containers
const localWeatherContainer = document.getElementById('localWeather');
const searchedWeatherContainer = document.getElementById('searchedWeather');

// API key from .env -- DO NOT COMMIT THIS!!!
const apiKey = "8e65421b6e97a45d703a871ea4e78c3a";

// API NASA key from .env -- DO NOT COMMIT THIS!!!
const nasaApiKey = "1kcuQpcr1vlNvRnPlFzxpE8z70Fhwdn1visKtVVq";

// Date Time els
const navDate = $('#navDate');
const navTime = $('#navTime');

// Weather conditions
let locationName;
let temperatureNum;
let windSpeed;
let humidityPer;
let weatherType;

// current weather icons
const ICON_CLASS_LIST = {
        sun: "fa-sun",
        moon: "fa-moon",
        rain: "fa-cloud-rain",
        dayRain: "fa-cloud-sun-rain",
        nightRain: "fa-cloud-moon-rain",
        heavyRain: "fa-showers-heavy",
        nightCloud: "fa-cloud-moon-",
        storm: "fa-cloud-bolt",
        tornado: "fa-tornado",
        floodWarning: "fa-cloud-showers-water",
        snow: "fa-snowflake",
        fog: "fa-smog",
        hurricane: "fa-hurricane",
        temperature: "fa-temperature-half"
    };

// function to handle auto complete
$( function() {
    let availableSearchTags = [
        "Mars",
        "London",
        "Berlin",
        "Tokyo",
        "Johannesburg",
        "Washington",
        "Paris",
        "Seoul"
    ];
    $('#tags').autocomplete({
        source: availableSearchTags
    });
});


// API CALLS ------------------------------------------------------------------------------

// fetch weather for the converted lat lon
async function fetchWeather(lat, lon) {
    // open weather api url
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    // parameters for url
    const params = {
        latitude: "lat=" + lat,
        longitude: "&lon=" + lon,
        key: "&appid=" + apiKey
    }

    // string concat to determine query
    let queryUrl = apiUrl + params.latitude + params.longitude + params.key;
    // console.log(queryUrl);
    
    // fetch data
    await fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            temperatureNum = (Math.round((data.main.temp - 273.15))) + "&deg;C";
            locationName = data.name;
            windSpeed = data.wind.speed + " kmph";
            humidityPer = data.main.humidity + "%";
            weatherType = data.weather[0].main;
            createWidget();
        })
        .catch(function (error) {
            console.log(error);
        });

}

// convert city name search to lat and lon coordinates
async function fetchLatLon(city) {
    // Base API URL
    let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    
    // Parameters (search location)
    const params = {
        cityName: city,
        key: "&appid=" + apiKey + ""
    }

    // Complete URL to request
    let queryUrl = apiUrl + params.cityName + params.key;

    // fetch response for coordinates
    await fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // fetch weather call with lat lon
            const lat = data[0].lat;
            const lon = data[0].lon;
            fetchWeather(lat, lon);
        })
        .catch(function (error) {
            console.log(error);
        });
    return;
}


// MARS WEATHER API CALL --------------------------------------------------------------------

// fetch mars weather
function fetchMarsWeather() {
    console.log("Mars Weather! Assign this function!");
}

// DATE TIME FUNCTIONS ----------------------------------------------------------------------

// function to retrieve current date and time
function getCurrentDate(format) {
    // create data for date and time
    let date = dayjs().format('dddd DD/MM/YYYY');
    let time = dayjs().format('HH:MM:ss a');;
    // return respective of format
    if (format === "date") {
        return date;
    } else {
        return time;
    }
}

// Display date and time function 
function displayDateTime(element, format) {
    // update time every second
    setInterval(() => {
        element.text(getCurrentDate(format));
    });
}


// FUNCTIONS TO DISPLAY DATA ----------------------------------------------------------------


// Position of weather widget on screen
let widgetPosition = "Local";

// Widget Array (lower api call quantity)
let widgetArray = [];

// constructor to store data as object
class Widget {
    constructor(location, weather, temp, humidity, wind) {
        this.location = location;
        this.weather = weather;
        this.temp = "Temperature (celcius): " + temp;
        this.humidity = "Humidity: " + humidity;
        this.wind = "Wind Speed: " + wind;
    }
}

function clearCurrentWidget() {
    // // if the element doesnt have child nodes, return
    // if (searchedWeatherContainer.hasChildNodes()) return;
    // console.log("true");

    
    // return;

    // Does element have children
    if (!searchedWeatherContainer.hasChildNodes()) {
        console.log("true");
        let currentWidget = searchedWeatherContainer.querySelector('div');
        console.log(currentWidget);
        searchedWeatherContainer.removeChild(currentWidget);
        return;
    } else {
        console.log("False");
        return;
    }
    

}

// weather widget function
function createWidget() {
    
    // create and store objects in array
    widgetArray.unshift(new Widget(locationName, weatherType, temperatureNum, humidityPer, windSpeed));
    console.log(widgetArray);
    
    // create parent div
    let widgetEl = document.createElement('div');
    widgetEl.className = "widget";
    widgetEl.style.width = "100%";
    widgetEl.style.height = "50%";

    // Create elements to display data
    let locationHeader = document.createElement('h2');
    let weatherSubHeader = document.createElement('h3');
    let tempEl = document.createElement('p');
    let humidityEl = document.createElement('p');
    let windEl = document.createElement('p');

    // assign content to elements
    locationHeader.innerText = widgetArray[0].location;
    weatherSubHeader.innerText = widgetArray[0].weather;
    tempEl.innerHTML = widgetArray[0].temp;
    humidityEl.innerText = widgetArray[0].humidity;
    windEl.innerText = widgetArray[0].wind;

    // append weather widgets
    widgetEl.append(locationHeader, weatherSubHeader, tempEl, humidityEl, windEl);

    // Where to display weather
    if (widgetPosition === "Local") {
        localWeatherContainer.append(widgetEl);
    } else {
        searchedWeatherContainer.append(widgetEl);
    }

}


// EVENT LISTENERS --------------------------------------------------------------------------

// Search bar listener and handler
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (searchBar.value == 'mars') {
            fetchMarsWeather();
            return;
        }
        // remove current widget from the screen (if present)
        clearCurrentWidget();
        // set position to align widget in correct section
        widgetPosition = "Searched";
        // search for closest match to search value
        fetchLatLon(searchBar.value);
    }
    
})


displayDateTime(navDate, "date");
displayDateTime(navTime, "time");

document.onload = fetchLatLon("London");

