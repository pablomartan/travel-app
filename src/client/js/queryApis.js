/*
 * HELPER FUNCTIONS
*/

/**
 * @description: selects the first picture with a 'city' tag from the array
 * given by Pixabay API
 * @param {Array} picArray: the array given by the Pixabay API
*/
const selectPicture = (picArray) => {
    for(let i = 0; i < picArray.length; i++) {
        const tags = picArray[i].tags.split(', ');
        for (let j = 0; j < tags.length; j++) {
            if (tags[j] === 'city') {
                return picArray[i];
            }
        };
    };
};

/**
 * @description: returns the average high and low temps for the given set of
 * temps
 * @param {Array} data: the data return by the Weatherbit Forecast API. Each
 * element is an object for each day in the next seven, with weather info for
 * each one
*/
const avgTemps = (data) => {
    console.log(data)
    let maxAvg = 0, minAvg = 0;
    for (let i = 0; i < data.length; i++) {
        maxAvg += data[i].max_temp;
        minAvg += data[i].min_temp;
    }
    maxAvg /= data.length;
    minAvg /= data.length;

    return {
        'max_avg': maxAvg.toFixed(2),
        'min_avg': minAvg.toFixed(2)
    }
};

/*
 * MAIN FUNCTIONALITY
*/

/**
 * @description: queries the GeoNames API with a location name and extracts the
 * latitude and longitude information from the first entry (the one with most
 * resemblance to the given name)
 * @param {String} url: the url to query the API
 * @param {String} key: the API key
 * @param {String} city: the location name
*/
const getLatLng = async (baseUrl, apiKey, city) => {
    const coords = await fetch(baseUrl + apiKey + `&q=${city}`)
    .then(async geoRes => { 
        const parsed = await geoRes.json();
        const latLng = { 'lat': parsed.geonames[0].lat, 'lng': parsed.geonames[0].lng };
        //console.log(latLng);
        return latLng;
    })
    .catch( error => {
        console.log(`Error while getting coordinates. See error message: ${error}`);
    })
    return coords;
};

/**
 * @description: queries the Pixabay API with a location name, gets the first
 * image related to that search and sends it back to the client
 * @param {String} url: the url to query the API
 * @param {String} key: the API key
 * @param {String} city: the location name
*/
const getPic = async (baseUrl, apiKey, city) => {
    console.log(`Querying for picture of city ${city}`);
    const pic = await fetch(baseUrl + apiKey + `&q=${city}&type=photo`)
    .then( async response => {
        const parsed = await response.json();
        const picture = parsed.hits[0];
        return picture;
    })
    .catch( error => {
        console.log(`Error while getting picture. See error message: ${error}`);
    })
    return pic.largeImageURL;
};

/**
 * @description: queries the Weatherbit API with the latitude and longitude and
 * returns the value back
 * @param {String} url: the url to query the API
 * @param {String} key: the API key
 * @param {Object} latLng: an object with the latitude and longitude of the desired
 * location.
*/
const getWeather = async (baseUrl, apiKey, latLng) => {
    const lat = latLng.lat;
    const lng = latLng.lng;
    const queryLocation = `lat=${lat}&lon=${lng}`;
    const weather = await fetch(baseUrl + queryLocation + apiKey)
    .then(async response => {
        const weatherData = await response.json();
        const newWeather = {}
        newWeather.temps = avgTemps(weatherData.data);
        newWeather.descr = weatherData.data[0].weather.description;
        return newWeather;
    })
    .catch( error => {
        console.log(`Error while fetching for weather info. See error message: ${error}`);
    })
    return weather
};

export {
    getLatLng,
    getWeather,
    getPic
}
