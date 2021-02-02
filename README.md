# Project Instructions

This project is a travel planner which takes destination and date inputs, and outputs weather and other information about a destination, this project utilizes 3 APIs:
- Geonames Api 
- Weatherbit Api
- Pixabay Api 


##### Technologies used in the project:
- Webpack
- Javascript, html, and css/sass
- Node.js
- Jest 
- NPM


##### Setup

1. install dependancies with the command `npm install`.
2. sign up for an api key in the following:
    - http://www.geonames.org/
    - https://www.weatherbit.io/api
    - https://pixabay.com/api/ 
    
3. put key in .env file as:
    - `geoApi_UNAME=<<Your API username for geonames>>`.
    - `weatherbit_API_KEY=<<Your API key for weatherbit>>`.
    - `pixabay_API_KEY=<<Your API username for pixabay>>`.
    
4. available commands for the project:
    - `npm run dev` to run app in development mode.
    - `npm run build` to run app in production mode.
    - `npm start` to start server on port 8081.
    - `npm test` to test functions.
