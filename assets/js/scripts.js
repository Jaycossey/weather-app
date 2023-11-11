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


// PLANNING --------------------------------------------

/**
 * What does this script need to do? 
 * I need to change 'local' li element to display an icon of current local weather
 *  -- using font awesome classes, I need to create an array to store the classnames
 *          - sun: fa-sun
 *          - moon: fa-moon
 *          - day rain: fa-cloud-sun-rain
 *          - rain: fa-cloud-rain
 *          - heavy rain: fa-showers-heavy
 *          - night rain: fa-cloud-moon-rain
 *          - night cloud: fa-cloud-moon
 *          - storm: fa-cloud-bolt
 *          - tornado: fa-tornado
 *          - flood warning: fa-cloud-showers-water
 *          - snoew: fa-snowflake
 *          - fog: fa-smog
 *          - hurricane: fa-hurricane
 *          - 
 *          - temperature icon: fa-temperature-half
 * I need to change 'title' li to display "Weather App" in searched local language -- NOT IMPORTANT BUT A FUN FEATURE
 * 
 * I need to call the api for OpenWeather
 * I need to call the api for Mars weather using NASA api's
 * 
 */

// API CALL --------------------------------------------


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