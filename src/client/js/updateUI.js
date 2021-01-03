const updateUI = (apiData, day = 0) => {
    if (day > 15) {
        day = 15;
    } else if (day < 1) {
        day = 0;
    }

    document.getElementById('country-code').innerHTML = `<span>Text:</span> ${apiData.country_code}`;
    document.getElementById('weather-icon').innerHTML = `<span>Text:</span> &${apiData.data[day].weather.icon}`;
    document.getElementById('weather-desc').innerHTML = `<span>Text:</span> ${apiData.data[day].weather.description}`;
    document.getElementById('lat').innerHTML = `<span>Agreement:</span> ${apiData.data[day].temp}`;
    document.getElementById('lng').innerHTML = `<span>Confidence:</span> ${apiData.data[day].ts}`;
    document.getElementById('general').innerHTML = `<span>Irony:</span> ${apiData.data[day].uv}`;
}

export {
    updateUI
}