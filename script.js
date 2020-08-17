console.log('Script loaded properly');
let APIkey = "289caca4b2bb76761ed37f7b9d379101";
let $cityName = $("#search-term");
let $searchButton = $("#search-term");
let $infor = $("#information");

$searchButton.on("click", searchStuff);
$cityName.on('keypress', keyPress);

function keyPress(e)
{
     if (e.key === 'Enter')
     {
          searchStuff();
     }
}
function searchStuff(event)
{
     event.preventDefault();
}
let cityName = "Dallas";
console.log('Script loaded properly');
let queryURL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIkey}`;
//ajax query here
$.ajax({
     url: queryURL,
     method: "GET"
     }).then(function(response) 
             {
                 console.log(response);
             });

