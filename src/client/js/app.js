
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

const getWeather = async (city, date) => {
    await queryGeoNames(city)
    .then(async geoRes => {
        const latLng = await geoRes.json();
        console.log(latLng);
        return latLng;
    })
    .then(async latLng => {
        const coordPluDate = { latLng, date };
        console.log(coordPluDate);
        return coordPluDate
    });
}

/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const formCollection = document.getElementsByTagName('form');
const form = formCollection[0];

const onSubmitLocation = (element) => {
    element.preventDefault();

    const city = { 'city': form[0].value };
    const date = {
        'start': form[1].value,
        'end': form[2].value
    }

    getWeather(city, date);
}

form.addEventListener('submit', onSubmitLocation);
