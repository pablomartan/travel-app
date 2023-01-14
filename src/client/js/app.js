
/**
 *
 * Helper functions
 *
*/

/**
 * @description: queries the GeoNames API with the location name provided by
 * the user and returns the latitude and longitud of said location
 * @param {String} cityName: the name of the location (presumed to be a city)
*/
const queryGeoNames = async (cityName) => {
    const query = await fetch('http://localhost:8081/city', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cityName)
        })
    return query;
}

/**
 *
 * Main functionality
 *
*/

const getWeather = async (cityName) => {
    await queryGeoNames(cityName)
    .then(async geoRes => {
        const latLng = await geoRes.json();
        console.log(latLng);
        return latLng;
    })
}

/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const form = document.getElementById('form-container');

const onSubmitLocation = (element) => {
    element.preventDefault();

    const locationInput = document.getElementById('location-input');
    const city = { 'city': locationInput.value };
    getWeather(city);
}

form.addEventListener('submit', onSubmitLocation);
