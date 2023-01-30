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
    
    if (localStorage.getItem('trips') != undefined) {
        const storedTrips = JSON.parse(localStorage.getItem('trips'));
        let tripArray = [];
        
        storedTrips.forEach(storedTrip => {
            const div = document.createElement('div');
            div.innerHTML = trip;
            tripArray.push(div.firstChild);
        })
        
        tripArray.filter(storedTrip => {
            storedTrip.id === trip.id
        });

        localStorage.setItem('trips', JSON.stringify(tripArray));
    }

    trip.remove();
}

export {
    saveTrip,
    displayOfflineTrips,
    deleteTrip
}
