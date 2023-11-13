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

$( function() {
    let availableSearchTags = [
        "Mars",
        "London",
        "Berlin",
        "Tokyo",
        "Johannesburg",
        "Washington",
        "Paris",
        ""
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
    let date = dayjs().format('dddd DD/MM/YYYY');
    let time = dayjs().format('HH:MM:ss a');;

    if (format === "date") {
        return date;
    } else {
        return time;
    }
}

// Display date and time function 
function displayDateTime(element, format) {
    setInterval(() => {
        element.text(getCurrentDate(format)); // SETS INFINITE LOOP
    });
}

displayDateTime(navDate, "date");
displayDateTime(navTime, "time");

// FUNCTIONS TO HANDLE WEATHER DATA --------------------


// FUNCTIONS TO DISPLAY DATA ---------------------------

// display local weather
function displayWeather(location, screenPosition) {
    let newDiv = document.createElement('div');
}

