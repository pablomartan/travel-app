/*
 * Testing the function to retrieve the keys from the server
*/

const request = require('supertest');
const app = require('../src/server/express');

describe('Test to the root of the server', () => {
    test('Testing the server returns the API keys', done => {
        request(app)
        .get('/all')
        .then(response => {
            expect(response).toBeDefined();
            done();
        });
    });
});
