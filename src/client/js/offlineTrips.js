/*
 * HELPER FUNCTIONS
*/


/*
 * MAIN FUNCTIONALITY
*/

/**
 * @description: saves a trip to localStorage to be able to retrieve it on
 * page load
 * @param {Event} click: the click after the user pressed the save trip button
*/
const saveTrip = (click) => {
    let savedTrips;
    const trip = click.originalTarget.parentElement.outerHTML;
    if (!localStorage.getItem('trips') == undefined) {
        savedTrips = JSON.parse(localStorage.getItem('trips'));
        console.log(savedTrips);
    } else {
        savedTrips = [];
    }
    savedTrips.push(trip);
    localStorage.setItem('trips', JSON.stringify(savedTrips));
};

/**
 * @description: deletes a trip from the DOM and the localStorage
 * @param {Event} click: the click event after the user pressed the delete trip
 * button
*/
export { saveTrip }
