// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const fetch = require("node-fetch");

// to use environment variables for api key
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('dist/index.html'));


// Setup Server
const port = 8888;
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});


app.get('/', function(request, response) {
    response.send('dist/index.html');
});


const apiGeonameURL = 'http://api.geonames.org/searchJSON?';
app.post('/geoname', async function(request, response) {
    const url = `${apiGeonameURL}q=${request.body.text}&maxRows=10&username=manpreetsingh`;
    // console.log(url);
    try {
        const geonameResponse = await fetch(url);
        const jsonData = await geonameResponse.json();
        // console.log(jsonData);
        response.send(jsonData);
    } catch(error) {
        console.log(error);
    }
})