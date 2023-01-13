/*
 * Sending the query to the server
*/
const sendQuery = async (cityName) => {
    try {
        await fetch('http://localhost:8081/city', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cityName)
        })
        .then(async (response) => {
            console.log('City Posted');
        })
    }
    catch(error) {
        console.log('Something went wrong! See: ', error);
    }
}

/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const locationSubmitButton = document.getElementById('location-submit');

const onSubmitLocation = (element) => {
    element.preventDefault();

    const locationInput = document.getElementById('location-input');
    const city = { 'city': locationInput.value };
    sendQuery(city);
}

locationSubmitButton.addEventListener('click', onSubmitLocation);
