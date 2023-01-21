const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// API keys
const GEO_API = process.env.GEONAMES_API_KEY;
const WEA_API = process.env.WEATHER_API_KEY;
const PIX_API = process.env.PIXABAY_API_KEY;

const apiKeys = {
    'geo': GEO_API,
    'wea': WEA_API,
    'pix': PIX_API
};
const getData = (req, res) => {
    res.send(JSON.stringify(apiKeys));
    return 1;
};

app.get('/all', getData);

module.exports = app;
