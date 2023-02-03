/*
 * HELPER FUNCTIONS
*/
/**
 * @description: extracts saved trips in localStorage
*/
const extractTripsFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('trips')) != null) {
        const savedTrips = JSON.parse(localStorage.getItem('trips'));
        let tripArray = [];
        savedTrips.forEach((trip) => {
            const div = document.createElement('div');
            div.innerHTML = trip;
            const extractedTrip = div.firstChild;
            tripArray.push(extractedTrip);
            div.remove();
        });
        return tripArray;
    } else {
        return undefined;
    }
};

/*
 * MAIN FUNCTIONALITY
*/
/**
 * @description: loads the saved trips in localStorage
*/
const displayOfflineTrips = () => {
    const tripArray = extractTripsFromLocalStorage();

    // check if there are saved trips in localStorage
    if (tripArray != undefined && tripArray.length > 0) {
        // create a trip container in case there isn't none
        const tripContainer = document.getElementById('trip-container') || Client.insertPlanContainer(Client.createPlanContainer());

        tripArray.forEach(trip => tripContainer.appendChild(trip));
        const saveButtons = Array.from(document.getElementsByClassName('save-button'));
        saveButtons.forEach(button => button.addEventListener('click', Client.saveTrip));
        const deleteButtons = Array.from(document.getElementsByClassName('delete-button'));
        deleteButtons.forEach(button => button.addEventListener('click', Client.deleteTrip));
    }
};

/**
 * @description: saves a trip to localStorage to be able to retrieve it on
 * page load
 * @param {Event} click: the click of the save trip button
*/
const saveTrip = (click) => {
    const originalTarget = click.originalTarget || click.srcElement;
    const trip = originalTarget.parentElement.outerHTML;
    let savedTrips;
    if (localStorage.getItem('trips') != undefined) {
        savedTrips = JSON.parse(localStorage.getItem('trips'));
    } else {
        savedTrips = [];
    }
    savedTrips.push(trip);
    localStorage.setItem('trips', JSON.stringify(savedTrips));
};

/**
 * @description: deletes a trip from the DOM and the localStorage;
 * @param: {Event} click: the click of the delete button
*/
const deleteTrip = (click) => {
    const originalTarget = click.originalTarget || click.srcElement;
    const trip = originalTarget.parentElement;
    
    // remove trip from saved trips
    const tripArray = extractTripsFromLocalStorage();
    if (tripArray != undefined && tripArray.length > 0) {
        const filtered = tripArray.filter(storedTrip => storedTrip.id != trip.id);
        let stringify = [];
        filtered.forEach(el => stringify.push(el.outerHTML));
        localStorage.setItem('trips', JSON.stringify(stringify));
    }

    // remove trip from DOM
    trip.remove();
}

export {
    saveTrip,
    displayOfflineTrips,
    deleteTrip
}
