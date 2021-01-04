import { updateUI } from './updateUI'

import "core-js/stable";
import "regenerator-runtime/runtime";

/* Global Variables */

const serverURL = 'http://localhost:8888';
let destination = document.getElementById('field');
let dateInput = document.getElementById('date-input');
let selectCountry = document.getElementById('select-country');

// checking to avoid null values
if (destination && dateInput && selectCountry) {
    destination = destination.value;
    dateInput = dateInput.value;
    selectCountry = selectCountry.value;
}


// make sure inputs are entered
const validateInputs = () => {

    destination = document.getElementById('field').value;
    dateInput = document.getElementById('date-input').value;
    selectCountry = document.getElementById('select-country').value;

    if (destination.length === 0 || dateInput === "") {
        alert('Please enter inputs');
        return false;
    } 

    else {
        console.log('correct Inputs');
        return true;
    }

}

    
const handleSubmit = async function () {

    if (!validateInputs()) {
        return;
    }

    // retrieve geoname data
    const geonameResponse = await postData(`${serverURL}/geoname`, destination);

    // recieve response from server and update UI
    try {
        console.log(geonameResponse);
        // calculate difference between today's and entered dates
        const diffDays = daysLeft(dateInput);

        // retrieve forecasts if difference is over 7 days
        if (diffDays <= 7) {

            // retrieve weatherbit data
            const data = await postData(`${serverURL}/currentWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);

            // retrieve pixabay data
            const imageData = await postData(`${serverURL}/pixabay`, `q=${destination}&image_type=photo&pretty=true&category=places`);
            console.log(imageData)
            updateUI(data, imageData, diffDays);
        }
        else if (diffDays > 7) {
            const data = await postData(`${serverURL}/forecastWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);

            const imageData = await postData(`${serverURL}/pixabay`, `q=${destination}&image_type=photo&pretty=true&category=places`);
            console.log(imageData)
            updateUI(data, imageData, diffDays);

        }
        
    } catch (error) {
        console.log("error: \n", error);
    }
}


const daysLeft = (inputDate) =>{
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date = new Date(inputDate);
    let currentDate = new Date();

    // time difference
    let timeDiff = Math.abs(currentDate.getTime() - date.getTime());

    // days difference
    let diffDays = Math.ceil(timeDiff / oneDay);
    console.log(date, currentDate);
    return diffDays;
}


// post request from server with any url
const postData = async ( url, data)=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          'text': data,
      }), 
    });
    return await response.json();
  }


// click event listener for generate button
let button = document.getElementById('generate');
if (button){
    button.addEventListener('click', handleSubmit);
}


export {
    handleSubmit,
    postData,
    daysLeft,
    validateInputs
}