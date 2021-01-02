import { updateUI } from './updateUI'

/* Global Variables */

const serverURL = 'http://localhost:8888';
// const apiGeonameURL = 'http://api.geonames.org/searchJSON?';
let destination = document.getElementById('field').value;


// Create a new date instance dynamically with JS
// let d = new Date();
// let currentDate = d.getFullYear()+'/'+d.getMonth()+'/'+ d.getDate();



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


    
const handleSubmit = async function () {
    if (destination.length === 0) {
        destination = 'Paris'; 
    }

    // const dateInput = document.getElementById('date-input').value;
    // console.log(destinationData);
    const geonameResponse = await fetch(`${serverURL}/geoname`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'text': destination
        }),
    })
    // console.log(response)

    // recieve response from server and update UI
    try {
        const data = await geonameResponse.json();
        console.log(data);
        updateUI(data);
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
  }

// const updateUIElements = async ()=> {
//     const response = await fetch(`${serverURL}`);
//     try {
//         const data = await response.json();
//         console.log(data);

//         countryCodeDiv.innerText = data.countryCode;
//         latitudeDiv.innerText = data.latitude;
//         longitudeDiv.innerText = data.longitude;
//         generalDiv.innerText = data.general;
//         document.getElementById('date').innerText = data.date;


//     } catch(error) {
//         console.log(error);
//     }
// }


// click event listener for generate button
document.getElementById('generate').addEventListener('click', handleSubmit);


export {
    handleSubmit,
    postData,
    fetchData,
    daysLeft
}