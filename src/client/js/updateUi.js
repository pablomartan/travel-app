/*
 * HELPER FUNCTIONS
*/
// TODO: process image and weather information

/**
 * @description: wraps a string in a span with class 'capitalize' to be
 * displayed with a capital initial
 * @param {String} word: the string to capitaliza
*/
const capitalize = (word) => {
    const capitalized = `<span class='capitalize'>${word}</span>`;
    return capitalized;
};

/**
 * @description: creates a section title for the new trip plan
 * @param {String} city: the name of the city to where the trip is
*/
const tripPlanTitle = (city) => {
    const title = document.createElement('h4');
    title.classList.add('trip-title');
    title.innerHTML = `Trip to ${capitalize(city)}<span>`;
    return title;
};

/**
 * @description: creates a starting date
 * @param {String} date: a date with format YYYY-MM-DD
 * @param {String} when: string indicating if trip starts or ends in date
*/
const createDate = (date, when) => {
    const parag = document.createElement('p');
    parag.classList.add(`${when}-date`);
    parag.innerHTML = `${capitalize(when)}<br>${date}`;
    return parag;
};

/**
 * @description: creates a div and adds the start and end date for the trip
 * @param {Object} dates: the starting and ending dates for the trip
*/
const tripPlanDates = (date) => {
    const div = document.createElement('div');
    div.classList.add('trip-dates');
    div.appendChild(createDate(date.start, 'start'));
    div.appendChild(createDate(date.end, 'end'));
    return div;
};

/**
 * @description: collects the new elements into a fragment that's then passed
 * on to updateUi for DOM manipulation
 * @param {Object} data: the data to place into the page
*/
const newTripPlan = (data) => {
    const fragment = document.createDocumentFragment();

    const newArticle = document.createElement('article');
    newArticle.id = `${data.city}-trip`;
    newArticle.classList.add('trip-card');

    newArticle.appendChild(tripPlanTitle(data.city));
    newArticle.appendChild(tripPlanDates(data.date));
    //newArticle.appendChild(tripPlanWeather(date.weather));
    
    fragment.append(newArticle);
    return fragment;
};

/*
 * MAIN FUNCTIONALITY
 */

/**
 * @description: updates the UI with the information of the planned trip given
 * by the user and the one retrieved from the server
 * @param {Object} data: an object with the relevant data:
 * - destination name
 * - start and end dates
 * - weather information
*/
const updateUi = (data) => {
    const planContainer = document.getElementById('plan-container');
    planContainer.appendChild(newTripPlan(data));
};

export {
    updateUi
}
