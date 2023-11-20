// GLOBALS --------------------------------------------------------------------------------

// Searchbar
const searchBar = document.getElementById('searchLoc');
let navIcon = document.getElementById('currentIcon');

// Containers
const localWeatherContainer = document.getElementById('localWeather');
const forecastDataContainer = document.getElementById('forecastWeather');

// API key from .env -- DO NOT COMMIT THIS!!! -- TOO LATE, invalidate them and generate new keys
const apiKey = "8e65421b6e97a45d703a871ea4e78c3a";

// Date Time els
const navDate = $('#navDate');
const navTime = $('#navTime');

// Weather conditions
let locationName;
let temperatureNum;
let windSpeed;
let humidityPer;
let weatherType;

// local time
let localTime = 0;

// current weather icons
let currentWeatherIconUrl;

// Store widget and forecast data for locations
let widgetArray;
let forecastData;

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
    $('#searchLoc').autocomplete({
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
            currentWeatherIconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            navIcon.src = currentWeatherIconUrl;

            // assign unix value in seconds
            localTime = data.timezone;
            createWidget();
        })
        .catch(function (error) {
            console.log(error);
        });

}

// fetch forecast function
async function fetchForecast(lat, lon) {
    // clear existing forecast data
    forecastData = [];
    // forecast api url 
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    // url parameters
    const params = {
        latitude: "lat=" + lat,
        longitude: "&lon=" + lon,
        key: "&appid=" + apiKey
    }

    // constructed url
    let queryUrl = apiUrl + params.latitude + params.longitude + params.key;

    // fetch data
    await fetch(queryUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                for (let i = 0; i <= data.list.length - 7; i+=8) {
                    forecastData.push(new ForecastDay(
                        data.list[i].dt_txt,
                        data.list[i].weather[0].main, 
                        (Math.round(data.list[i].main.temp - 273.15)) + "&deg;C", 
                        data.list[i].weather[0].icon,
                        data.list[i].main.humidity + "%"));
                        
                }
                // console.log(forecastData);
            })
            .catch(function (error) {
                console.log(error);
            });

            displayForecast();
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
            fetchForecast(lat, lon);
        })
        .catch(function (error) {
            console.log(error);
        });
    return;
}


// DATE TIME FUNCTIONS ----------------------------------------------------------------------

// function to retrieve current date and time
function getCurrentDate(format) {
    // create date & time format for local time to location searched
    let date = dayjs().format('dddd DD/MM/YYYY');
    let time = dayjs().format('HH:MM:ss a');

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
    }, 1000);
}


// FUNCTIONS TO DISPLAY DATA ----------------------------------------------------------------


// Position of weather widget on screen
let widgetPosition = "Local";

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

// constructor to handle forecast data
class ForecastDay {
    constructor(date, weather, temperature, icon, humidity) {
        this.date = date,
        this.weather = weather,
        this.temperature = temperature,
        this.icon = icon,
        this.humidity = humidity
    }
}

// clear searched weather widget
function clearCurrentWidget() {
    $('#localWeather').empty();
    $('#forecastWeather').empty();
}


// weather widget function
function createWidget() {
    widgetArray = [];
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

    // display weather
    localWeatherContainer.append(widgetEl);

}

// function to display forecast
function displayForecast() {
    // console.log("forecast function call");
    // For each forecast object
    forecastData.forEach((forecast) => {
        // create parent div
        let dayEl = document.createElement('div');
        dayEl.class = "forecastElement";
        // display data 
        let dateEl = document.createElement('p');
        let iconEl = document.createElement('img');
        let weatherEl = document.createElement('p');
        let temperatureEl = document.createElement('p');
        let humidityEl = document.createElement('p');

        // icon image url
        let forecastIcon = "https://openweathermap.org/img/wn/" + forecast.icon + "@2x.png";

        // assign values 
        dateEl.innerText = forecast.date;
        iconEl.setAttribute('src', forecastIcon);
        weatherEl.innerHTML = forecast.weather;
        temperatureEl.innerHTML = forecast.temperature;
        humidityEl.textContent = forecast.humidity;

        // append to parent and screen
        dayEl.append(dateEl, iconEl, weatherEl, temperatureEl, humidityEl);
        forecastDataContainer.append(dayEl);
    });
}


// EVENT LISTENERS --------------------------------------------------------------------------

// Search bar listener and handler
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // remove current widget from the screen (if present)
        clearCurrentWidget();
        // search for closest match to search value
        fetchLatLon(searchBar.value);
        // clear current search
        searchBar.value = "";
    }
    
})


displayDateTime(navDate, "date");
displayDateTime(navTime, "time");

document.onload = fetchLatLon("London");