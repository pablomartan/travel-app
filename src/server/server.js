const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT | 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// API keys
const GEO_API = `&username=${process.env.GEONAMES_API_KEY}`;
const GEO_LIMIT = '&maxrows=1';
const WEA_API = process.env.WEATHER_API_KEY;
const PIX_API = process.env.PIXABAY_API_KEY;

// API base urls
const GEO_URL = 'http://api.geonames.org/searchJSON?q=';
//const WEA_URL =
const PIX_URL = `https://pixabay.com/api/?key=${PIX_API}`;


/**
 * @description: queries the GeoNames API with a location name and extracts the
 * latitude and longitude information from the first entry (the one with most
 * resemblance to the given name)
 * @param {Request} req: the request object from the fetch
 * @param {Response} res: the response object from the fetch
*/
const getLatLng = async (req, res) => {
    const CITY = req.body.city;

    await fetch(GEO_URL+CITY+GEO_LIMIT+GEO_API)
    .then(async geoRes => { 
        const parsed = await geoRes.json();
        const latLng = { 'lat': parsed.geonames[0].lat, 'lng': parsed.geonames[0].lng };
        console.log(latLng);
        res.send(JSON.stringify(latLng));
        return latLng;
    })
    .catch( error => { console.log(error) })
}

app.post('/city', getLatLng);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
