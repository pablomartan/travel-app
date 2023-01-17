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

export {
    onSubmitLocation,
    getLatLng,
    getWeather,
    getPic,
    updateUi
}

const form = document.getElementById('travel-form');
form.addEventListener('submit', onSubmitLocation);
