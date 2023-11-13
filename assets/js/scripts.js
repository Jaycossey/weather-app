// GLOBALS ---------------------------------------------

// Containers
const localWeatherContainer = document.getElementById('localWeather');
const searchedWeatherContainer = document.getElementById('searchedWeather');

// Date Time els
const navDate = $('#navDate');
const navTime = $('#navTime');

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

// PLANNING --------------------------------------------

/**
 * What does this script need to do? 
 * I need to change 'local' li element to display an icon of current local weather

 * I need to call the api for OpenWeather
 * I need to call the api for Mars weather using NASA api's
 * 
 */

// API CALL --------------------------------------------
async function fetchWeather() {
    const apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
    
    // fetch data from API
    fetch(apiUrl)
        .then((response) => {
            // handle response 
            console.log(response.json());
            return response.json();
        })
        .then((data) {
            // handle error
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });

}

// MARS WEATHER API CALL -------------------------------


// DATE TIME FUNCTIONS ---------------------------------

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

displayDateTime(navDate, "date");
displayDateTime(navTime, "time");

// FUNCTIONS TO HANDLE WEATHER DATA --------------------


// FUNCTIONS TO DISPLAY DATA ---------------------------

// array to store weather data
let widgetArray = [];

// lets show off OOP a bit as well. create constructor
class WeatherWidget {
    // constructor to assign with new keyword
    constructor(location, temperature, wind, humidity) {
        // create widget element
        this.element = document.createElement('div');
        this.element.className = "widget";

        // create widget children
        this.locEl = document.createElement('p');
        this.tempEl = document.createElement('p');
        this.windEl = document.createElement('p');
        this.humEl = document.createElement('p');
    
        // assign text values
        this.locEl.textContent = location;
        this.tempEl.textContent = temperature;
        this.windEl.textContent = wind;
        this.humEl.textContent = humidity;

        // append to parent
        this.element.append(this.locEl, this.tempEl, this.windEl, this.humEl);

        // return completed element
        return this.element;
    }

}

// function to call new widget
function createWidget(location) {
    // new widget with data as args
    let widget = new WeatherWidget(location, 10, "10kph", "84%");
    // store in array
    widgetArray.push(widget);
    // console.log(widget);
    // return element 
    return widget;
}

// display local weather
function displayWeather(screenPosition) {
    // create container to hold the widgets
    let newDiv = document.createElement('div');
    newDiv.style.height = "320px";
    newDiv.style.width = "90%";
    newDiv.style.border = "2px solid red";
    newDiv.style.borderRadius = "20px";
    newDiv.style.margin = "auto";
    newDiv.style.marginTop = "15px";
    newDiv.style.backgroundColor = "#3A9E91";
    
    // determine if local weather or searched weather
    if (screenPosition === "local") {
        // append the widget to parent div
        newDiv.append(createWidget("London"));
        // append div to container
        localWeatherContainer.appendChild(newDiv);
    } else {
        newDiv.append(createWidget("Mars"));
        searchedWeatherContainer.appendChild(newDiv);
    }
}

displayWeather("local");
displayWeather("searched");
console.log(widgetArray);