var city = $("#searchTerm").val();
const apiKey ="&appid=afaa8eea1769b4359fd8e07b2efcefbd";
var date = new Date();

$("#searchTerm").on("click", function(event) { 
    $("#forecastH3").addClass("show");
    var city = $("#searchTerm").val();
    $("searchTerm").val("");
    
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    
    $.ajax({
    url: queryUrl,
    method: "GET"
    })
    .then(function(response){
        console.log(name);
    })
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
});
function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }