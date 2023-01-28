/*
 * HELPER FUNCTIONS
*/

/*
 * MAIN FUNCTIONALITY
*/
/**
 * @description: loads the saved trips in localStorage
*/
const displayOfflineTrips = () => {
    if (localStorage.getItem('trips') != undefined) {
        const tripArray = JSON.parse(localStorage.getItem('trips'));
        const tripContainer = document.getElementById('trip-container') || Client.insertPlanContainer(Client.createPlanContainer());
        tripArray.forEach((trip) => {
            const div = document.createElement('div');
            div.innerHTML = trip;
            const extractedTrip = div.firstChild;
            tripContainer.appendChild(extractedTrip);
        });
    }
};

/**
 * @description: saves a trip to localStorage to be able to retrieve it on
 * page load
 * @param {Event} click: the click after the user pressed the save trip button
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

export {
    saveTrip,
    displayOfflineTrips
}
