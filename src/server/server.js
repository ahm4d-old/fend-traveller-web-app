// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8888;
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});

/* Same as :
const server = app.listen(port, listening);
function listening(){
    console.log(`running on port ${port}`);
};
*/

app.get('/projectData', function(request, response) {
    response.send(projectData);
});


app.post('/', function(request, response) {
    projectData = {
        countryCode: request.body.countryCode,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        placename: request.body.placename
    };
    console.log(projectData);
    
    response.send(projectData);
})