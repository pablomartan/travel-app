/*
 * Testing the function to retrieve the keys from the server
 * Followed instructions on https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
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
