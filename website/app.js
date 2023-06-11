/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// My OpenWeatherMap API Key
const apiKey = 'c4d77a1584fce82a4dd10249d22936cb&units=imperial';

// The base URL for OpenWeatherMap API
// Note: I am using API version 2.5 because it allowed the ZIP parameter.
const OWM_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const generateButton = document.querySelector('#generate');

const fetchOWM = async (baseURL, zipCode, apiKey) => {
  const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(
        'Could not fetch data from Open Weather Map API, make sure the ZIP Code is correct.'
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Could not fetch.');
  }
};

const postWeatherInfo = async (path, data) => {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response;
};

const updateUI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  document.querySelector('#temp').innerHTML =
    Math.round(data.temperature) + ' degrees';
  document.querySelector('#date').innerHTML = data.date;
  document.querySelector('#content').innerHTML = data.userResponse;
};

generateButton.addEventListener('click', () => {
  const zipCode = document.querySelector('#zip').value;
  const userFeelings = document.querySelector('#feelings').value;

  // using promise chanining with then and catch.
  // could be done using async and await instead.
  fetchOWM(OWM_BASE_URL, zipCode, apiKey)
    .then((data) => {
      const temperature = data.main.temp;
      const requestBody = {
        temperature: temperature,
        date: newDate,
        userResponse: userFeelings
      };
      return postWeatherInfo('/data', requestBody);
    })
    .then(async () => {
      await updateUI('/data');
    })
    .catch((err) => {
      console.log(err);
    });
});
