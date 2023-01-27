/*
 * HELPER FUNCTIONS
*/

/**
 * @description: gets the background url of a given HTML Element
 * @param {HTMLElement} el: the HTML element
*/
const getBgUrl = (el) => {
    return url;
};

/**
 * @description: downloads the city pic to a file and sets the background to it
 * @param {HTMLElement} trip: the trip card
*/
const offlinePic = (trip) => {
    let pic;
    for (let i = 0; i < trip.childNodes.length; i++) {
        const el = trip.childNodes[i];
        if (el.classList.contains('trip-pic')) {
            pic = el;
        }
    };
    const bg = pic.style.background;
    const url = bg.slice(4, -1).replace(/"/g, "");
    const a = document.createElement('a');
    a.href = getBgUrl(pic);
    a.download = `${trip.id}.png`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();

    return pic;
};

/*
 * MAIN FUNCTIONALITY
*/
/**
 * @description: loads the saved trips in localStorage
*/
const displayOfflineTrips = () => {
    if (localStorage.getItem('trips') != undefined) {
        const tripArray = JSON.parse(localStorage.getItem('trips'));
        console.log(tripArray);
        const tripContainer = document.getElementById('trip-container') || Client.insertPlanContainer(Client.createPlanContainer());
        tripArray.forEach((trip) => {
            const div = document.createElement('div');
            div.innerHTML = trip;
            const extractedTrip = div.firstChild;
            tripContainer.appendChild(offlinePic(extractedTrip));
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
