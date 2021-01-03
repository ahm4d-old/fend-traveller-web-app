import { updateUI } from './updateUI'

/* Global Variables */

const serverURL = 'http://localhost:8888';
let destination = document.getElementById('field').value;


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

    const dateInput = document.getElementById('date-input').value;
    // console.log(destinationData);
    // const geonameResponse = await fetch(`${serverURL}/geoname`, {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         'text': destination
    //     }),
    // })
    const geonameResponse = await postData(`${serverURL}/geoname`, destination);
    // const currentWbitResponse; 
    // recieve response from server and update UI
    try {
        console.log(geonameResponse);
        const diffDays = daysLeft(dateInput);
        if (diffDays <= 7) {
            const data = await postData(`${serverURL}/currentWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);
            updateUI(data);
        }
        else if (diffDays > 7) {
            const data = await postData(`${serverURL}/forecastWbit`, `&lat=${geonameResponse.geonames[0].lat}&lon=${geonameResponse.geonames[0].lng}`);
            console.log(data);
            updateUI(data);
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
    daysLeft
}