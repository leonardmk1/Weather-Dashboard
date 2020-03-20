var city = $("#searchTerm").val();
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

var date = new Date();

$("#searchTerm").keypress(function(event) { 
    if (event.keycode ===13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});
$("#searchBtn").on("click", function() {
    
    $("#forecastH3").addClass("show");
    var city = $("#searchTerm").val();
    $("searchTerm").val("");
    
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    
    $.ajax({
    url: queryUrl,
    method: "GET"
    })
    .then(function(response){
        console.log(name)
        console.log(response.name)
        console.log(response.weather[0].icon)
        var tempF = (response.main.temp - 273.15) * 1.80 +32;
        console.log(Math.floor(tempF))
        console.log(response.main.humidity)
        console.log(response.wind.speed)
    
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
    })
});
function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}
function getCurrentConditions() {
    var tempF = (response.main.temp -273.15) * 1.80 +32;
    tempF = Math.floor(tempF);
    $("#currentCity").empty();






}