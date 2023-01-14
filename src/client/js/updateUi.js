/*
 *
 * HELPER FUNCTIONS
 *
*/

/**
 * @description: updates the UI with the information of the planned trip given
 * by the user and the one retrieved from the server
 * @param {Object} data: an object with the relevant data, generated by
 * collectData in app.js
*/
const updateUi = (data) => {
    console.log(`updateUi function says: "Hey, I'm being called" with ${data}`);
};

export {
    updateUi
}