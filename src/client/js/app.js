/*
 * Retrieving the submit button, defining the function to handle the user
 * input, and adding the event listener
*/
const locationSubmitButton = document.getElementById('location-submit');

const onSubmitLocation = (element) => {
    element.preventDefault();

    const locationInput = document.getElementById('location-input');
    const city = locationInput.value;
    console.log('The city is ', city);
};

locationSubmitButton.addEventListener('click', onSubmitLocation);
