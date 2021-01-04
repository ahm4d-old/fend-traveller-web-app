import { updateUI } from './updateUI'

import "core-js/stable";
import "regenerator-runtime/runtime";

/* Global Variables */

const serverURL = 'http://localhost:8888';
let destination = document.getElementById('field');
let dateInput = document.getElementById('date-input');
let selectCountry = document.getElementById('select-country');

if (destination && dateInput && selectCountry) {
    destination = destination.value;
    dateInput = dateInput.value;
    selectCountry = selectCountry.value;
}



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

    const geonameResponse = await postData(`${serverURL}/geoname`, destination);

    // recieve response from server and update UI
    try {
        console.log(geonameResponse);
        const diffDays = daysLeft(dateInput);
        if (diffDays <= 7) {
            const data = await postData(`${serverURL}/currentWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);

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


const daysLeft = (firstDate) =>{
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let dateFirst = new Date(firstDate);
    let currentDate = new Date();

    // time difference
    let timeDiff = Math.abs(currentDate.getTime() - dateFirst.getTime());

    // days difference
    let diffDays = Math.ceil(timeDiff / oneDay);
    console.log(dateFirst, currentDate);
    return diffDays;
}


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