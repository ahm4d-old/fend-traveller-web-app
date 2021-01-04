const updateUI = (placeData, imageData, day = 0) => {
    // max 15 and min 0 since weatherbit api only gives forecasts for 16 days
    if (day > 15) {
        day = 15;
    } else if (day < 0) {
        day = 0;
    }

    document.getElementById('destination').innerHTML = `<span>Destination:</span> ${placeData.city_name}`;
    document.getElementById('country-code').innerHTML = `<span>Country Code:</span> ${placeData.country_code}`;
    document.getElementById('date').innerHTML = `<span>on Date:</span> ${document.getElementById('date-input').value}`;
    document.getElementById('weather-desc').innerHTML = `<span>Weather Description:</span> ${placeData.data[day].weather.description}`;
    document.getElementById('general').innerHTML = `<span>Destination Temperature:</span> ${placeData.data[day].temp} C`;

    // to avoid webformatURL being undefined
    if (imageData.total < 5) {
        document.getElementById('image').innerHTML = `<span class="error">Sorry, Image Unavailable</span>`;
    } else {
        document.getElementById('image').innerHTML = `<br><img src="${imageData.hits[day].webformatURL}" alt="${placeData.city_name}">`;
    }

}

export {
    updateUI
}