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

// how to approach this? 
// I need to create a variable to store this data 
/**
 * I need the search bar to have a "submit" event listener to handle the 
 * calls for different cities. I have the auto complete already.
 * I need to add previous searches to the autocomplete, store those strings in
 * localstorage
 * 
 * I need to setup a display to hold each part of the data
 * 
 */



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
        this.location = location,
        this.temperature = temperature,
        this.wind = wind,
        this.humidity = humidity
    }

    // create the element here
    renderWidget() {
        // This is proving an issue, I want to be able to dynamically 
        // create an element which holds the data above, How do I create
        // an element here which doesnt show [object][object]
        // read into constructors more.

        // return element with data
        return widget;
    }
}

// function to call new widget
function createWidget(location) {
    // new widget with data as args
    let widget = new WeatherWidget(location, 10, "10kph", "84%");
    // store in array
    widgetArray.push(widget);
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
        searchedWeatherContainer.appendChild(newDiv);
    }
}

displayWeather("local");
displayWeather("searched");
console.log(widgetArray);