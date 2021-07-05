// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var cities = [];

var lookUpCityFormEl = document.querySelector("#lookUpCityForm");
var enteredCityEl = document.querySelector("#city");
var lookedUpCityEl = document.querySelector("#lookedUpCity");
var upcomingWeather = document.querySelector("#upcomingWeather");
var currentWeatherHolderEl = document.querySelector("#currentWeatherHolder");
var fiveDayWeatherHolderEl = document.querySelector("#fiveDayWeatherHolder");
var recentlyViewedEl = document.querySelector("#recentlyViewed");


var handlesSubmit = function (event) {
    event.preventDefault();
    var city = enteredCityEl.value.trim();
    if (city) {
        getWeatherData(city);
        grabFiveDay(city);
        cities.unshift({ city });
        enteredCityEl.value = "";
    } else {
        alert("Something is off here, please try again");
    }
    saveThatSearch();
    recentSearch(city);

}

var saveThatSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getWeatherData = function (city) {
    var keyOfAPI = "cbc3e876c3052d94c4bb2fd2f431468b"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${keyOfAPI}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                showWeather(data, city);
            });
        });

};

var showWeather = function (weather, cityToLookFor) {
    currentWeatherHolderEl.textContent = "";
    lookedUpCityEl.textContent = cityToLookFor;
    // Icons //
    var statusIcon = document.createElement("img")
    statusIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    lookedUpCityEl.appendChild(statusIcon);
    // Temperature Span //
    var temperatureData = document.createElement("span");
    temperatureData.textContent = "temperature: " + weather.main.temp + "°F";
    temperatureData.classList = "list-group-item"
    // Date //
    var dateOnCalander = document.createElement("span")
    dateOnCalander.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    lookedUpCityEl.appendChild(dateOnCalander);
    // Wind Span //
    var windMPH = document.createElement("span");
    windMPH.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windMPH.classList = "list-group-item"
    // Humidity Span //
    var howHumid = document.createElement("span");
    howHumid.textContent = "Humidity: " + weather.main.humidity + "%";
    howHumid.classList = "list-group-item"
    // connecting to their containers //
    currentWeatherHolderEl.appendChild(windMPH);
    currentWeatherHolderEl.appendChild(temperatureData);
    currentWeatherHolderEl.appendChild(howHumid);

    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    UvIndex(latitude, longitude)
}

var UvIndex = function (latitude, longitude) {
    var keyOfAPI = "cbc3e876c3052d94c4bb2fd2f431468b"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${keyOfAPI}&lat=${latitude}&lon=${longitude}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                showUvIndex(data)
            });
        });
}

var showUvIndex = function (index) {
    var showUvIndexEl = document.createElement("div");
    showUvIndexEl.textContent = "UV Index: "
    showUvIndexEl.classList = "list-group-item"

    valueOfUvIndex = document.createElement("span")
    valueOfUvIndex.textContent = index.value

    if (index.value <= 2) {
        valueOfUvIndex.classList = "favorable"
    } else if (index.value > 2 && index.value <= 8) {
        valueOfUvIndex.classList = "moderate"
    } else if (index.value > 8) {
        valueOfUvIndex.classList = "severe"
    };

    showUvIndexEl.appendChild(valueOfUvIndex);
    currentWeatherHolderEl.appendChild(showUvIndexEl);
}

var grabFiveDay = function (city) {
    var keyOfAPI = "cbc3e876c3052d94c4bb2fd2f431468b"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${keyOfAPI}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                showFiveDay(data);
            });
        });
};

var showFiveDay = function (weather) {
    fiveDayWeatherHolderEl.textContent = ""
    upcomingWeather.textContent = "5 Day Forecast:";

    var weatherOutlook = weather.list;
    for (var i = 5; i < weatherOutlook.length; i = i + 8) {
        var individualWeather = weatherOutlook[i];

        var weatherOutlookEl = document.createElement("div");
        weatherOutlookEl.classList = "card bg-info text-light m-2";
        // Date //
        var weatherDate = document.createElement("h5")
        weatherDate.textContent = moment.unix(individualWeather.dt).format("MMM D, YYYY");
        weatherDate.classList = "card-header text-center bg-info"
        weatherOutlookEl.appendChild(weatherDate);
        // Icons //
        var statusIcon = document.createElement("img")
        statusIcon.classList = "card-body text-center";
        statusIcon.setAttribute("src", `https://openweathermap.org/img/wn/${individualWeather.weather[0].icon}@2x.png`);

        weatherOutlookEl.appendChild(statusIcon);

        // set of Spans //

        // humidity //
        var howHumidEl = document.createElement("span")
        howHumidEl.classList = "card-body text-center";
        howHumidEl.textContent = "Humidity: " +individualWeather.main.humidity + " %";
        weatherOutlookEl.appendChild(howHumidEl);

        // temperature //

        var temperatureDataEl = document.createElement("span");
        temperatureDataEl.classList = "card-body text-center";
        temperatureDataEl.textContent = individualWeather.main.temp + "°F";
        weatherOutlookEl.appendChild(temperatureDataEl);

        var windMphEl = document.createElement("span")
        windMphEl.classList = "card-body text-center";
        windMphEl.textContent = "Wind Speed: " + individualWeather.wind.speed + " MPH";
        weatherOutlookEl.appendChild(windMphEl);

        fiveDayWeatherHolderEl.appendChild(weatherOutlookEl);
    }

}

var recentSearch = function (recentSearch) {
    recentSearchEl = document.createElement("button");
    recentSearchEl.textContent = recentSearch;
    recentSearchEl.classList = "d-flex w-100 btn-light border p-2";
    recentSearchEl.setAttribute("dataOfCity", recentSearch)
    recentSearchEl.setAttribute("type", "submit");

    recentlyViewedEl.prepend(recentSearchEl);
}

var pastHandledSubmit = function (event) {
    var city = event.target.getAttribute("dataOfCity")
    if (city) {
        getWeatherData(city);
        grabFiveDay(city);
    }
}

lookUpCityFormEl.addEventListener("submit", handlesSubmit);
recentlyViewedEl.addEventListener("click", pastHandledSubmit);