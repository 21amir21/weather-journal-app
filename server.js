// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require Body Parser
const bodyParser = require('body-parser');

// Require CORS
const cors = require('cors');

// Start up an instance of app
const app = express();

// Define port number
const PORT = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Create a POST route to populate the global projectData object with the user request info
app.post('/data', (req, res) => {
  const userData = req.body;
  projectData.temperature = userData.temperature;
  projectData.date = userData.date;
  projectData.userResponse = userData.userResponse;

  res.status(201).send('Data has been registered successfully.');
});

// Create a GET route that returns the projectData object
app.get('/data', (req, res) => {
  const jsonProjectData = JSON.stringify(projectData);
  res.send(jsonProjectData);
});

// Setup Server
const server = app.listen(PORT, () => {
  console.log(`Server started listening on localhost:${PORT}`);
});
