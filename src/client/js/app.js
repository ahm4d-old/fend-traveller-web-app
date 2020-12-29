/* Global Variables */

//api.openweathermap.org/data/2.5/forecast/daily?zip={zip code},{country code}&appid={API key}
//const { url } = require("inspector");

const serverURL = 'http://localhost:8888';
const apiBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '342a04b4b94b19a1f65865381da66b55'; 
let zip = document.getElementById('zip').value;
const tempDiv = document.getElementById('temp');
const dateDiv = document.getElementById('date');
const contentDiv = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



const fetchWaetherData = async (url)=>{
    const response = await fetch(url) 
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch(error) {
            console.log('fetchWeatherData Error', error);
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
    const textAreaContent = document.getElementById('feelings').value;
    //console.log(url);
    const weatherData = await fetchWaetherData(url);
    const data = {
        date: newDate,
        temperature: weatherData.main.temp,
        content: textAreaContent
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

        dateDiv.innerText = data.date;
        tempDiv.innerText = data.temperature;
        contentDiv.innerText = data.content;

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
    fetchWaetherData
}