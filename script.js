// creating a global variable city for the search term
var city = $("#searchTerm").val();
// variable with api key
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
// date variable
var date = new Date();
// var creates a function that removes the display hide from the 5 day forecast and makes and ajax call to the api with the search term 
var search = function() {
  $("#forecastH3").removeClass("hide");

  city = $("#searchTerm").val();

  const queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    // this call returns the UV Index based on the coordinates from the call can appends the value of the coordinates to the card body. 
    $.ajax({
      url:
        `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}` +
        apiKey,
      method: "GET"
    }).then(function(response2) {
      const index = $("<p>")
        .addClass("card-text current-uvi")
        .text("UV Index: " + response2.value);
  
      $(".card-body").append(index);
    });
// these will run when the function is engaged

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
  });
};
// on the click of the search button the function search will run
$("#searchBtn").on("click", search);
// this function gos to local storage gets the item searches, parses it, creating a variable citiesArr 
function makeList() {
  let citiesArr = JSON.parse(localStorage.getItem("searches"));
  // if the variable citiesArr is null, put the search into the array
  if (citiesArr === null) {
    citiesArr = [city];
    // if the array does not include the city in local sotrage the push it to the array
  } else if (!citiesArr.includes(city)) {
    citiesArr.push(city);
  }
  // empty the list to avoid having the whole array populate
  $(".list").empty();
  // goes through the array creates a list item, adds a class and appends it to the page
  for (let i = 0; i < citiesArr.length; i++) {
    var listItem = $("<li>")
      .addClass("list-group-item")
      .text(citiesArr[i]);
    $(".list").append(listItem);
  }
// sets the items searched into local storage and stringifes the array
  localStorage.setItem("searches", JSON.stringify(citiesArr));
}
// gets the current conditons for the city searched 
function getCurrentConditions(response) {
  // creates a variable from the api temp and the formula to turn it into Farenheit
  var tempF = (response.main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);
// empty div 
  $("#currentCity").empty();
// jquery creates elements to return the data from the api 
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>")
    .addClass("card-title")
    .text(response.name);
  const cityDate = $("<h4>")
    .addClass("card-title")
    .text(date.toLocaleDateString("en-US"));
  const temperature = $("<p>")
    .addClass("card-text current-temp")
    .html("Temperature: " + tempF + "&deg; F");
  const humidity = $("<p>")
    .addClass("card-text current-humidity")
    .text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.wind.speed + " MPH");
  const image = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );
// appends the data from the api on the page in the current city div
  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}
// creates a function to get the 5 day forecast for the current city searched 
function getCurrentForecast() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function(response) {
    $("#forecast").empty();
// creates a variable that is the response and lists it
    var results = response.list;

    for (let i = 0; i < results.length; i++) {

      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        var temp = (results[i].main.temp - 273.15) * 1.8 + 32;
        let tempF = Math.floor(temp);
// creates elements for the page based on the data in the api
        const card = $("<div>").addClass(
          "card col-sm-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-2 forecastBody");
        const cityDate = $("<h5>")
          .addClass("card-title")
          .text(date.toLocaleDateString("en-US"));
        const temperature = $("<p>")
          .addClass("card-text current-temp")
          .html("Temperature: " + tempF + "&deg; F");
        const humidity = $("<p>")
          .addClass("card-text current-humidity")
          .text("Humidity: " + results[i].main.humidity + "%");
        const image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            results[i].weather[0].icon +
            ".png"
        );
// appends the data from the api on the page in the div forecast
        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
      }
    }
  });
}
// upon clicking on the list item or city the funciton search will run and it will return the current data and forecast.
$(".list").on("click", ".list-group-item", function() {
  $(searchTerm).val($(this).text());
  search();
});
// 
// upon page loading the cities search from local storage and append them to the page  
let citiesArr = JSON.parse(localStorage.getItem("searches"));
if (citiesArr !== null) {
  for (let i = 0; i < citiesArr.length; i++) {
    var listItem = $("<li>")
      .addClass("list-group-item")
      .text(citiesArr[i]);
    $(".list").append(listItem);
  }
}
