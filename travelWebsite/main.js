// This is a practice project from Codecademy learning platform

// Foursquare API Info
const clientId = '1WVDSNKKW15F1ZXJ54NLX43K4LIRJEMNW01EDJ5KLRC3XFCC';
const clientSecret = 'ON0REKKBMV3MZRQW4BFBVFPBDDUVL4HZU4TPOCBESENBF1KU';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info, this API was shut down
// const apiKey = '75d278f0ca164ea7b56160902192804';
// const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// OpenWeather API Info
const openWeatherKey = '9adbd340dd1a85f8733a87b7ff44e3f2';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions
const getVenues = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190428`;
  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
			console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }
    else {
      throw new error('Request failed!')
    }
  } catch(error) {
    console.log(error.message);
  
  };
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`; 
  try {
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //const day= jsonResponse.forecast.forecastday;
      return jsonResponse;
    }
  }catch(error){
    console.log(error);
  }

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues =>renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)