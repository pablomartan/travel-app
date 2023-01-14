import { onSubmitLocation } from './js/app'
import { getLatLng, getPic } from './js/queryApis'
import { updateUi } from './js/updateUi'

import './styles/_variables.scss'
import './styles/style.scss'

export {
    onSubmitLocation,
    getLatLng,
    getPic,
    updateUi
}

const form = document.getElementById('travel-form');
form.addEventListener('submit', onSubmitLocation);
