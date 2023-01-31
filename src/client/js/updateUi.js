/*
 * HELPER FUNCTIONS
*/
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
    parag.innerHTML = `${capitalize(when)}: ${date}`;
    return parag;
};

/**
 * @description: creates a div and adds the start and end date for the trip
 * @param {Object} dates: the starting and ending dates for the trip
*/
const tripPlanDates = (date) => {
    const div = document.createElement('div');
    div.classList.add('depart-date');
    div.appendChild(createDate(date, 'departing'));
    return div;
};

/**
 * @description: turns a url image into base64
 * @param {String} url: the url where the image is
 * function sourced from https://stackoverflow.com/a/20285053
*/
const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
}))


/**
 * @description: creates the img element to display in the trip card
 * @param {String} url: the url where the image is located
*/
const tripPlanPic = (url) => {
    const newPic = document.createElement('div');
    newPic.classList.add('trip-pic');
    toDataURL(url)
        // .replace from https://stackoverflow.com/a/28288424
        .then(data => data.replace(/(\r\n|\n|\r)/gm, ""))
        .then(base64 => newPic.style.background = `url(${base64})`);
    return newPic;
};

/**
 * @description: creates an image for the weather icon
 * @param {String} code: weather icon code
 * The codes can be checked on Weatherbit API docs: https://www.weatherbit.io/api/codes
*/
const weatherIcon = (code) => {
    const icon = document.createElement('img');
    icon.classList.add('weather-icon');
    icon.src = `icons/${code}.png`;
    icon.alt = 'Icon corresponding to the weather description';
    return icon;
};

/**
 * @description: places weather info inside of HTML elements to be displayed
 * @param {Object} data: data.descr is a description of the weather (e.g.:
 * 'Broken clouds'; data.temps is an object with max_avg and min_avg keys,
 * which are max and min temperature average for the day
*/
const tripPlanWeather = (data) => {
    const div = document.createElement('div');
    const avgTemp = document.createElement('p');
    avgTemp.classList.add('avg-temps');
    const weather = document.createElement('p');
    weather.classList.add('weather-descr');
    div.classList.add('weather-info');
    avgTemp.innerHTML = `Avg. temps: <span class="max_avg">${data.temps.max_avg}</span> ºC, <span class="min_avg">${data.temps.min_avg}</span> ºC`;
    weather.innerText = `Today the weather is: ${data.descr}`;
    div.appendChild(avgTemp);
    div.appendChild(weather);
    div.appendChild(weatherIcon(data.icon));
    return div;
};

/**
 * @description: creates a button with the specified value and id
 * @param {String} value: the desired value for the button
*/
const createButton = (value) => {
    const button = document.createElement('button');
    button.value = value;
    button.classList.add(`${value}-button`);
    button.innerHTML = `${capitalize(value)}`;
    return button;
};

/**
 * @description: collects the new elements into a fragment that's then passed
 * on to updateUi for DOM manipulation
 * @param {Object} data: the data to place into the page
*/
const newTripPlan = (data) => {
    const fragment = document.createDocumentFragment();

    const newArticle = document.createElement('article');
    newArticle.id = `${data.city.toLowerCase()}-trip`;
    newArticle.classList.add('trip-card');
    const saveButton = createButton('save');
    saveButton.addEventListener('click', Client.saveTrip);
    const deleteButton = createButton('delete');
    deleteButton.addEventListener('click', Client.deleteTrip);

    newArticle.appendChild(tripPlanTitle(data.city));
    newArticle.appendChild(tripPlanDates(data.date));
    newArticle.appendChild(tripPlanWeather(data.weather));
    newArticle.appendChild(tripPlanPic(data.pic));
    newArticle.appendChild(saveButton);
    newArticle.appendChild(deleteButton);

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
    const planContainer = document.getElementById('trip-container') || Client.insertPlanContainer(Client.createPlanContainer());
    planContainer.appendChild(newTripPlan(data));
};

export {
    updateUi
}
