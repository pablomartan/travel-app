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
const WEA_API = process.env.WEATHER_API_KEY;
const PIX_API = process.env.PIXABAY_API_KEY;

// API base urls
const GEO_URL = 'http://api.geonames.org/searchJSON?q=';
//const WEA_URL
//const PIX_URL

const getLatLng = async (req, res) => {
    await fetch(GEO_URL+req.body.city+GEO_API)
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
