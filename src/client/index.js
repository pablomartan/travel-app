import { onSubmitLocation } from './js/app'
import {
    getLatLng,
    getPic,
    getWeather 
} from './js/queryApis'

import { updateUi } from './js/updateUi'

import './styles/_variables.scss'
import './styles/_colorpalette.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/tripCard.scss'
import './styles/footer.scss'

import a01d from './media/weather_icons/a01d.png'
import a01n from './media/weather_icons/a01n.png'
import a02d from './media/weather_icons/a02d.png'
import a02n from './media/weather_icons/a02n.png'
import a03d from './media/weather_icons/a03d.png'
import a03n from './media/weather_icons/a03n.png'
import a04d from './media/weather_icons/a04d.png'
import a04n from './media/weather_icons/a04n.png'
import a05d from './media/weather_icons/a05d.png'
import a05n from './media/weather_icons/a05n.png'
import a06d from './media/weather_icons/a06d.png'
import a06n from './media/weather_icons/a06n.png'
import c01d from './media/weather_icons/c01d.png'
import c01n from './media/weather_icons/c01n.png'
import c02d from './media/weather_icons/c02d.png'
import c02n from './media/weather_icons/c02n.png'
import c03d from './media/weather_icons/c03d.png'
import c03n from './media/weather_icons/c03n.png'
import c04d from './media/weather_icons/c04d.png'
import c04n from './media/weather_icons/c04n.png'
import d01d from './media/weather_icons/d01d.png'
import d01n from './media/weather_icons/d01n.png'
import d02d from './media/weather_icons/d02d.png'
import d02n from './media/weather_icons/d02n.png'
import d03d from './media/weather_icons/d03d.png'
import d03n from './media/weather_icons/d03n.png'
import f01d from './media/weather_icons/f01d.png'
import f01n from './media/weather_icons/f01n.png'
import r01d from './media/weather_icons/r01d.png'
import r01n from './media/weather_icons/r01n.png'
import r02d from './media/weather_icons/r02d.png'
import r02n from './media/weather_icons/r02n.png'
import r03d from './media/weather_icons/r03d.png'
import r03n from './media/weather_icons/r03n.png'
import r04d from './media/weather_icons/r04d.png'
import r04n from './media/weather_icons/r04n.png'
import r05d from './media/weather_icons/r05d.png'
import r05n from './media/weather_icons/r05n.png'
import r06d from './media/weather_icons/r06d.png'
import r06n from './media/weather_icons/r06n.png'
import s01d from './media/weather_icons/s01d.png'
import s01n from './media/weather_icons/s01n.png'
import s02d from './media/weather_icons/s02d.png'
import s02n from './media/weather_icons/s02n.png'
import s03d from './media/weather_icons/s03d.png'
import s03n from './media/weather_icons/s03n.png'
import s04d from './media/weather_icons/s04d.png'
import s04n from './media/weather_icons/s04n.png'
import s05d from './media/weather_icons/s05d.png'
import s05n from './media/weather_icons/s05n.png'
import s06d from './media/weather_icons/s06d.png'
import s06n from './media/weather_icons/s06n.png'
import t01d from './media/weather_icons/t01d.png'
import t01n from './media/weather_icons/t01n.png'
import t02d from './media/weather_icons/t02d.png'
import t02n from './media/weather_icons/t02n.png'
import t03d from './media/weather_icons/t03d.png'
import t03n from './media/weather_icons/t03n.png'
import t04d from './media/weather_icons/t04d.png'
import t04n from './media/weather_icons/t04n.png'
import t05d from './media/weather_icons/t05d.png'
import t05n from './media/weather_icons/t05n.png'
import u00d from './media/weather_icons/u00d.png'
import u00n from './media/weather_icons/u00n.png'

export {
    onSubmitLocation,
    getLatLng,
    getWeather,
    getPic,
    updateUi
}

const form = document.getElementById('travel-form');
form.addEventListener('submit', onSubmitLocation);
