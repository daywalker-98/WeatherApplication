console.log('Script loaded properly');
let APIkey = "289caca4b2bb76761ed37f7b9d379101";
let $cityName = $("#search-term");
let $searchButton = $("#search-button");
var cityArray = new Array();

$searchButton.on("click", searchCity);
function searchCity(event)
{
     event.preventDefault();
     var cityName = $cityName.val();
     let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIkey}`;
     //ajax query here
     $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) 
                    {
                         var name = response.name;
                         $("#city-display").html(name);
                         $("#city-buttons").remove(`#${name}`);
                         var $cityButton = $(`<button class="col-12"id="${name}"></button>`).text(name); 
                         $cityButton.html = name;
                         $("#city-buttons").append($cityButton);
                         let lon = response.coord.lon;
                         let lat = response.coord.lat;
                         $cityButton.on("click", changeCity);
                         let queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
                         $.ajax({
                                   url: queryURL2,
                                   method: "GET"
                                   }).then(function(response)
                                        {
                                             $("#temp").html("Temperature: " + response.current.temp + "°F");
                                             $("#humidity").html("Humidity: "+ response.current.humidity)+"%";
                                             $("#wind-speed").html("Wind speed: "+ response.current.wind_speed+" MPH");
                                             $("#UVindex").html("UV index: " + response.current.uvi);
                                             console.log(response);
                                        });
                              });
}
$("#searchForm").submit(function(event) 
{
     search($("#search-term").get(0));
     if(event.keyCode == 13)
     {
          event.preventDefault();
          $("#search-button").click();
     }
     return false;
});
function changeCity(event)
{
     event.preventDefault();
     var cityName = this.getAttribute("id");
     let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIkey}`;
     //ajax query here
     $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) 
                    {
                         var date = new Date();
                         var name = response.name;
                         $("#city-display").html(`${name} ${date}`);
                         $("#city-buttons").remove(`#${name}`);
                         let lon = response.coord.lon;
                         let lat = response.coord.lat;
                         let queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
                         $.ajax({
                                   url: queryURL2,
                                   method: "GET"
                                   }).then(function(response)
                                        {
                                             $("#temp").html("Temperature: " + response.current.temp + "°F");
                                             $("#humidity").html("Humidity: "+response.current.humidity);
                                             $("#wind-speed").html("Wind speed: "+ response.current.wind_speed+" MPH");
                                             $("#UVindex").html("UV index: " + response.current.uvi);
                                             console.log(response);
                                        });
                              });
}