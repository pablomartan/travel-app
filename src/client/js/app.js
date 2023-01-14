let geoKey;
const geoUrl = 'http://api.geonames.org/searchJSON?username=';
let weaKey;
const weaUrl = 'https://api.weatherbit.io/v2.0/forecast/daily'; 
let pixKey;
const pixUrl = 'https://pixabay.com/api/?key=';

const keyPairs = {
    'geo': geoKey,
    'wea': weaKey,
    'pix': pixKey
};

/**
 *
 * Helper functions
 *
*/

/**
 * @description: queries the GeoNames API with a location name and extracts the
 * latitude and longitude information from the first entry (the one with most
 * resemblance to the given name)
 * @param {String} city: the location name
*/
const getLatLng = async (baseUrl, apiKey, city) => {
    console.log(`Querying for coordinates of city ${city}`);
    const coords = await fetch(baseUrl + apiKey + `&q=${city}`)
    .then(async geoRes => { 
        const parsed = await geoRes.json();
        const latLng = { 'lat': parsed.geonames[0].lat, 'lng': parsed.geonames[0].lng };
        //console.log(latLng);
        return latLng;
    })
    .catch( error => { console.log(error) })

    return coords;
}

/**
 * @description: queries the Pixabay API with a location name, gets the first
 * image related to that search and sends it back to the client
 * @param {String} city: the location name
*/
const getPic = async (baseUrl, apiKey, city) => {
    console.log(`Querying for picture of city ${city}`);
    const pic = await fetch(baseUrl + apiKey + `&q=${city}&type=photo`)
    .then( async response => {
        const parsed = await response.json();
        const url = parsed.hits[0].largeImageURL;
        return url;
    })
    return pic;
}

/**
 * @description: retrieves an API key dictionary from server
 * @param {String}: the URL to fetch
*/
const retrieveKeys = async (url) => {
    await fetch(url)
    .then(async response => {
        const keys = await response.json();
        geoKey = keys.geo;
        weaKey = keys.wea;
        pixKey = keys.pix;
    })
    .catch(error => {
        console.log(`Error while retrieving keys. See message: ${error}`);
    })
};

/**
 * @description: collects the data from the different APIs and sends it to the
 * function for updating the UI 
 * @param {String} city: the city name
 * @param {Object} date: the starting and ending dates the trip is planned for
*/
const collectData = async (city, date) => {
    retrieveKeys('http://localhost:8081/keyPairs')
    .then(async () => {
        const latLng = await getLatLng(geoUrl, geoKey, city);
        //const weather = await getWeater(latLng, date, weaUrl, weaKey);
        const pic = await getPic(pixUrl, pixKey, city);
        const data = {
            'city': city,
            //'weather': weather,
            'pic': pic
        };
        return data;
    })
};

/**
 *
 * Main functionality
 *
*/


/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const formCollection = document.getElementsByTagName('form');
const form = formCollection[0];

const onSubmitLocation = (element) => {
    element.preventDefault();

    const city = form[0].value;
    const date = {
        'start': form[1].value,
        'end': form[2].value
    }

    collectData(city, date);
}

form.addEventListener('submit', onSubmitLocation);
