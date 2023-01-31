/*
 * HELPER FUNCTIONS
*/
/**
 * @description: extracts saved trips in localStorage
*/
const extractTripsFromLocalStorage = () => {
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
};

/*
 * MAIN FUNCTIONALITY
*/
/**
 * @description: loads the saved trips in localStorage
*/
const displayOfflineTrips = () => {
    // check if there are saved trips in localStorage
    if (localStorage.getItem('trips') != undefined) {
        // create a trip container in case there isn't none
        const tripContainer = document.getElementById('trip-container') || Client.insertPlanContainer(Client.createPlanContainer());

        const tripArray = extractTripsFromLocalStorage();
        tripArray.forEach(trip => tripContainer.appendChild(trip));
    }
};

/**
 * @description: saves a trip to localStorage to be able to retrieve it on
 * page load
 * @param {Event} click: the click of the save trip button
*/
const saveTrip = (click) => {
    let savedTrips;
    const trip = click.originalTarget.parentElement.outerHTML;
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
    const trip = click.originalTarget.parentElement;
    
    // remove trip from saved trips
    if (localStorage.getItem('trips') != undefined) {
        let tripArray = extractTripsFromLocalStorage();
        
        tripArray.filter(storedTrip => {
            storedTrip.id === trip.id
        });

        localStorage.setItem('trips', JSON.stringify(tripArray));
    }

    // remove trip from DOM
    trip.remove();
}

export {
    saveTrip,
    displayOfflineTrips,
    deleteTrip
}
