// Function to fetch information about a city by its name and country code
async function fetchCityInfo(cityName, countryCode) {
  // Construct the URL, including the city name and optionally the country code
  /*The encodeURIComponent() function encodes a URI by replacing each instance 
  of certain characters by one, two, three, or four escape sequences representing 
  the UTF-8 encoding of the character*/
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(cityName)}${countryCode ? `&countryIds=${countryCode}` : ''}`;
  
  // HTTP request options including method and headers
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    // Fetching the data from the URL
    const response = await fetch(url, options);
    // Parsing the response to JSON
    const result = await response.json();
    // Taking the first city from the array
    const cityData = result.data[0];
    // Fetching additional city details like elevation
    await fetchCityDetails(cityData);
    // Fetching temperature using latitude and longitude
    await temperatureInfo(cityData);
    // Updating the DOM with the fetched data
    updateDOM(cityData);
  } catch (error) {
    // Error handling 
    console.error(error);
  }
}

// Function to fetch additional city details like elevation using wikiDataId(unique identifier)
async function fetchCityDetails(data) {
  // Constructing the URL using the wikiDataId of the city
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${data.wikiDataId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  // Fetching the data from the URL
  const response = await fetch(url, options);
  // Parsing the response to JSON
  const result = await response.json();
  // Adding the elevation data 
  data.elevationMeters = result.data.elevationMeters;
}

// Function to fetch temperature based on latitude and longitude
async function temperatureInfo(data) {
  // Constructing the URL using the city's latitude and longitude
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${data.longitude}&lat=${data.latitude}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a",
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  try {
    // Fetching the data from the URL
    const response = await fetch(url, options);
    // Parsing the response to JSON
    const result = await response.json();
    // Adding the temperature data 
    data.temperature = result.data[0].temp;
  } catch (error) {
    // Error handling 
    console.error(error);
  }
}

// Function to update the DOM with city and weather information
function updateDOM(data) {
  // Destructuring the needed data
  const { population, elevationMeters, latitude, longitude, temperature } = data;
  // Updating the corresponding HTML elements with the fetched data
  document.getElementById("population").innerText = population;
  document.getElementById("elevation").innerText = elevationMeters;
  document.getElementById("latitude").innerText = latitude;
  document.getElementById("longitude").innerText = longitude;
  document.getElementById("currentTemperature").innerText = temperature;
}

// Initial call to fetch city information for Johannesburg
fetchCityInfo("Johannesburg", "ZA");
