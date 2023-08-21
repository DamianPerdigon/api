const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q34647";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// La palabra clave "await" solo se puede usar dentro de una función asíncrona, así que la colocamos dentro de una
async function fetchCityInfo() {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Si la respuesta es JSON, podemos usar el método json() para parsearla
    console.log(`Latitud: ${result.data.latitude}`);
    console.log(`Longitud: ${result.data.longitude}`);
    // Puedes acceder a otros datos de la respuesta aquí, según la estructura de la respuesta de la API
    const temperature = temperatureInfo(result.data);
    console.log(temperature)
    updateDOM(result.data);
  } catch (error) {
    console.error(error);
  }
}

// Function to update the DOM with the fetched city and weather information
function updateDOM(data) {
  const { population, elevationMeters, latitude, longitude, temperature } = data;
  document.getElementById("population").innerText = population;
  document.getElementById("elevation").innerText = elevationMeters;
  document.getElementById("latitude").innerText = latitude;
  document.getElementById("longitude").innerText = longitude;
  document.getElementById("currentTemperature").innerText = temperature;
}

async function temperatureInfo(data) {
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=28.041638888&lat=-26.204361111`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6bcaba155msh0142505f38d30b0p107d0ejsnbc82651a1d2a",
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result)
  } catch (error) {
    console.error(error);
  }
}

fetchCityInfo();
