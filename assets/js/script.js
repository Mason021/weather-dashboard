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

var button = document.querySelector(".button")
var inputValue = document.querySelector(".inputValue")
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var windSpeed = document.querySelector(".windSpeed");
// var name = document.querySelector(".name");
// var name = document.querySelector(".name");

button.addEventListener("click", function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=cbc3e876c3052d94c4bb2fd2f431468b')
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
        var nameValue = data["name"];
        var tempValue = data["main"]["temp"]
        var descValue = data["weather"][0]["description"]
        var humidValue = data["main"]["humidity"]
        var windSpeedValue = data["wind"]["speed"];

        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
        humidity.innerHTML = humidValue;
        windSpeed.innerHTML = windSpeedValue;
    })

.catch(err => alert("Something is off here, please try again")) 
})

// fetch('api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=cbc3e876c3052d94c4bb2fd2f431468b')
//     .then (response => response.json())
//     .then(data => console.log(data))

// .catch(err => alert("wrong city name!"))