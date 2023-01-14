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
 *
 * Main functionality
 *
*/

/**
 * @description: collects the data from the different APIs and sends it to the
 * function for updating the UI 
 * @param {String} city: the city name
 * @param {Object} date: the starting and ending dates the trip is planned for
*/
const collectData = async (city, date) => {
    retrieveKeys('http://localhost:8081/keyPairs')
    .then(async () => {
        const latLng = await Client.getLatLng(geoUrl, geoKey, city);
        //const weather = await Client.getWeater(latLng, date, weaUrl, weaKey);
        const pic = await Client.getPic(pixUrl, pixKey, city);
        const data = {
            'city': city,
            'date': date,
            //'weather': weather,
            'pic': pic
        };
        console.log(data);
        return data;
    })
    .then(data => {
        Client.updateUi(data);
    })
};

/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const form = document.getElementById('travel-form');

const onSubmitLocation = (evnt) => {
    evnt.preventDefault();

    const city = form[0].value;
    const date = {
        'start': form[1].value,
        'end': form[2].value
    }

    collectData(city, date);
}

export {
    onSubmitLocation
}
