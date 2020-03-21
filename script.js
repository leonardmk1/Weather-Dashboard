var city = $("#searchTerm").val();

const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

var date = new Date();

$("#searchBtn").on("click", function() {
    $('#forecastH3').removeClass("hide");
  
    city = $("#searchTerm").val();

   const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function(response) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}`+ apiKey,
        method: "GET"
      }).then(function(response2){
        console.log(response2.value)

      })
    console.log(response);
    
    console.log(response.name);
    console.log(response.weather[0].icon);
    
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF));
    
    console.log(response.main.humidity);
    
    console.log(response.wind.speed);

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
    
    })
  });

function makeList() {
  var listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getCurrentConditions(response) {
  var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  tempF = Math.floor(tempF);
  
  $("#currentCity").empty();

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

  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.dt);
    $("#forecast").empty();

    var results = response.list;
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      
      var day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
      var hour = results[i].dt_txt.split("-")[2].split(" ")[1];
      console.log(day);
      console.log(hour);

      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        var temp = (results[i].main.temp - 273.15) * 1.8 + 32;
        let tempF = Math.floor(temp);

        const card = $("<div>").addClass(
          "card col-sm-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-1 forecastBody");
        const cityDate = $("<h4>")
          .addClass("card-title")
          .text(date.toLocaleDateString("en-US"));
        const temperature = $("<p>")
          .addClass("card-text current-temp")
          .html("Temperature: " + tempF + "&deg; F");
          console.log("+++++++++++++++++++++++++++", response)
        const humidity = $("<p>")
          .addClass("card-text current-humidity")
          .text("Humidity: " + results[i].main.humidity + "%");
        const wind = $("<p>")
          .addClass("card-text current-wind")
          .text("Wind Speed: " + results[i].wind.speed + " MPH");
        const image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            results[i].weather[0].icon +
            ".png"
        );

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
      }
    }
  });
}
