// Constants for API credentials and hosts
const GEO_API_KEY = 'c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a';
const GEO_API_HOST = 'wft-geo-db.p.rapidapi.com';
const WEATHER_API_KEY = 'c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2astar';
const WEATHER_API_HOST = 'weatherbit-v1-mashape.p.rapidapi.com';

// Function to fetch city information using the provided city code
async function fetchCityInfo(cityCode) {
  const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityCode}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': GEO_API_KEY,
      'X-RapidAPI-Host': GEO_API_HOST,
    },
  });
  return await response.json();
}

// Function to fetch weather information using latitude and longitude
async function fetchWeatherInfo(latitude, longitude) {
  const response = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitude}&lon=${longitude}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': WEATHER_API_KEY,
      'X-RapidAPI-Host': WEATHER_API_HOST,
    },
  });
  return await response.json();
}

// Function to update the DOM with the fetched city and weather information
function updateDOM(data) {
  const { population, elevationMeters, latitude, longitude, temperature } = data;
  document.getElementById('population').innerText = population;
  document.getElementById('elevation').innerText = elevationMeters;
  document.getElementById('latitude').innerText = latitude;
  document.getElementById('longitude').innerText = longitude;
  document.getElementById('currentTemperature').innerText = temperature;
}

// Main function to get city and weather information
async function getCityInfo(cityCode) {
  try {
    // Fetching city information
    const cityData = await fetchCityInfo(cityCode);
    const { population, elevationMeters, latitude, longitude } = cityData.data;

    // Fetching weather information
    const weatherData = await fetchWeatherInfo(latitude, longitude);
    const temperature = weatherData.data[0].temp;

    // Updating the DOM with fetched data
    updateDOM({ population, elevationMeters, latitude, longitude, temperature });
  } catch (error) {
    // Handling and displaying errors
    console.error(error);
    alert('An error occurred while loading the city information');
  }
}

// Function to initiate the city information fetching process
function loadCityInfo() {
  const cityCode = 'Q60'; // City code for Johannesburg
  getCityInfo(cityCode);
}

// Renaming and exporting the loadCityInfo function for use in other files
const _loadCityInfo = loadCityInfo;
module.exports.loadCityInfo = _loadCityInfo;
