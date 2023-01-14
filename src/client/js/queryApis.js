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
    console.log(coords);
    return coords;
}

/**
 * @description: selects the first picture with a 'city' tag from the array
 * given by Pixabay API
 * @param {Array} picArray: the array given by the Pixabay API
*/
const selectPicture = (picArray) => {
    let picSelection = [];
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
 * @description: queries the Pixabay API with a location name, gets the first
 * image related to that search and sends it back to the client
 * @param {String} city: the location name
*/
const getPic = async (baseUrl, apiKey, city) => {
    console.log(`Querying for picture of city ${city}`);
    const pic = await fetch(baseUrl + apiKey + `&q=${city}&type=photo`)
    .then( async response => {
        const parsed = await response.json();
        //console.log(parsed.hits);
        const picture = selectPicture(parsed.hits);
        return picture;
    })
    return pic.largeImageURL;
}

export {
    getLatLng,
    getPic
}
