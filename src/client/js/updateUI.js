const updateUI = (data) => {

    document.getElementById('country-code').innerHTML = `<span>Text:</span> ${data.geonames[0].countryCode}`;
    document.getElementById('lat').innerHTML = `<span>Agreement:</span> ${data.geonames[0].lat}`;
    document.getElementById('lng').innerHTML = `<span>Confidence:</span> ${data.geonames[0].lng}`;
    document.getElementById('general').innerHTML = `<span>Irony:</span> ${data.geonames[0].fcodeName}`;
}

export {
    updateUI
}