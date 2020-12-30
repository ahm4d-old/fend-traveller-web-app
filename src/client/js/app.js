/* Global Variables */

const serverURL = 'http://localhost:8888';
const apiBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?postalcode=9011&maxRows=10&username=manpreetsingh';
const apiKey = '342a04b4b94b19a1f65865381da66b55'; 
let zip = document.getElementById('zip').value;
const countryCodeDiv = document.getElementById('country-code');
const latitudeDiv = document.getElementById('lat');
const longitudeDiv = document.getElementById('lng');
const placeNameDiv = document.getElementById('placename');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



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


    
const handleGenerateButton = async function () {
    if (zip.length === 0) {
        zip = '94040,us';
    }
    else {
        zip = document.getElementById('zip').value; 
    }
    let url = `${apiBaseURL}${zip}&appid=${apiKey}&units=imperial`;
    //console.log(url);
    const weatherData = await fetchData(apiBaseURL);
    console.log(weatherData);
    const data = {
        countryCode: weatherData.postalCodes[0].countryCode,
        latitude: weatherData.postalCodes[0].lat,
        longitude: weatherData.postalCodes[0].lng,
        placename: weatherData.postalCodes[0].placeName
    }
    await postData(serverURL, data);
    updateUIElements();
}



const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });
      /*try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }*/
  }

//postData(serverURL, data);


const updateUIElements = async ()=> {
    const response = await fetch(`${serverURL}/projectData`);
    try {
        const data = await response.json();
        console.log(data);

        countryCodeDiv.innerText = data.countryCode;
        latitudeDiv.innerText = data.latitude;
        longitudeDiv.innerText = data.longitude;
        placeNameDiv.innerText = data.placename

    } catch(error) {
        console.log(error);
    }
}


// click event listener for generate button
document.getElementById('generate').addEventListener('click', handleGenerateButton);


export {
    handleGenerateButton,
    updateUIElements,
    postData,
    fetchData
}