import { updateUI } from './updateUI'

/* Global Variables */

const serverURL = 'http://localhost:8888';
let destination = document.getElementById('field').value;
let dateInput = document.getElementById('date-input').value;
let selectCountry = document.getElementById('select-country').value;



const fetchData = async (url)=>{
    const response = await fetch(url) 
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch(error) {
            console.log('fetchData Error', error);
        }
    }


const validateInputs = () => {
    if (destination.length === 0) {
        destination = 'Paris'; 
        // return false;
    } 
    else if (dateInput === "") {
        dateInput = new Date("06/30/2019");
        // return false;
    } 
    else if (selectCountry === "0") {
        selectCountry = 'Algeria';
        // return false;
    }
    else {
        console.log('correct Inputs');
        return true;
    }

}

    
const handleSubmit = async function () {
    console.log(selectCountry);
    validateInputs();
    // console.log(dateInput);
    console.log(selectCountry);
    const geonameResponse = await postData(`${serverURL}/geoname`, destination);

    // recieve response from server and update UI
    try {
        console.log(geonameResponse);
        const diffDays = daysLeft(dateInput);
        if (diffDays <= 7) {
            const data = await postData(`${serverURL}/currentWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);
            // updateUI(data);

            const imageData = await postData(`${serverURL}/pixabay`, `q=${destination}&image_type=photo&pretty=true&category=places`);
            console.log(imageData)
        }
        else if (diffDays > 7) {
            const data = await postData(`${serverURL}/forecastWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);
            // updateUI(data);

            const imageData = await postData(`${serverURL}/pixabay`, `q=${destination}&image_type=photo&pretty=true&category=places`);
            console.log(imageData)
        }
        
    } catch (error) {
        console.log("error: \n", error);
    }
    // const data = {
    //     countryCode: destinationData.geonames[0].countryCode,
    //     latitude: destinationData.geonames[0].lat,
    //     longitude: destinationData.geonames[0].lng,
    //     general: destinationData.geonames[0].fcodeName,
    //     date: dateInput,
    //     daysLeft: daysLeft(dateInput)
    // }
    // await postData(serverURL, data);
    // Client.updateUI(destinationData);
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
document.getElementById('generate').addEventListener('click', handleSubmit);


export {
    handleSubmit,
    postData,
    fetchData,
    daysLeft,
    validateInputs
}