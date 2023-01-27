/*
 * SOME HELPER CODE USED BY SEVERAL FUNCTIONS
*/

/**
 * @description: creates a new section to contain the planned trips
*/
const createPlanContainer = () => {
    const container = document.createElement('section');
    const containerHeader = document.createElement('h2');

    container.id = 'trip-container';
    containerHeader.id = 'trip-container-header';
    containerHeader.innerText = 'My trips';
    container.appendChild(containerHeader);

    return container;
};

/**
 * @description: inserts the plan container after the form in the page
*/
const insertPlanContainer = (container) => {
    const sections = document.getElementsByTagName('section');
    sections[0].parentNode.insertBefore(container, sections[0].nextSibling);

    return container;
};

export {
    createPlanContainer,
    insertPlanContainer
}
