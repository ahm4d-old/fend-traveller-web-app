/* Global Variables */

const serverURL = 'http://localhost:8888';
const apiGeonameURL = 'http://api.geonames.org/searchJSON?';
let destination = document.getElementById('field').value;
const countryCodeDiv = document.getElementById('country-code');
const latitudeDiv = document.getElementById('lat');
const longitudeDiv = document.getElementById('lng');
const placeNameDiv = document.getElementById('placename');


// Create a new date instance dynamically with JS
let d = new Date();
// let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
// d.getFullYear() +'-'+ d.getMonth()+'-'+ d.getDate();



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
    if (destination.length === 0) {
        destination = document.getElementById('field').value; 
    }
    else {
        destination = document.getElementById('field').value; 
    }
    let url = `${apiGeonameURL}q=${destination}&maxRows=10&username=manpreetsingh`;
    //console.log(url);
    const destinationData = await fetchData(url);
    console.log(destinationData);
    const data = {
        countryCode: destinationData.geonames[0].countryCode,
        latitude: destinationData.geonames[0].lat,
        longitude: destinationData.geonames[0].lng,
        general: destinationData.geonames[0].fcodeName,
        date: document.getElementById('date-input').value,
        // daysLeft: daysLeft(document.getElementById('date-input').value)
    }
    await postData(serverURL, data);
    updateUIElements();
}


// const daysLeft = (firstDate) =>{
//     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//     const firstDate = new Date(2008, 1, 12);
//     let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

//     const diffDays = Math.round(Math.abs((firstDate - currentDate) / oneDay));
//     console.log(firstDate, currentDate);
//     return diffDays;
// }


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
        placeNameDiv.innerText = data.general;
        document.getElementById('date').innerText = data.date;


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