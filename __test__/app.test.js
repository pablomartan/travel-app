/*
 * Testing the main app functionality
*/

import { resetKeys } from '../src/client/js/app'

describe('Testing functionality from the main app', () => {
    test('Testing the function to reset keys', () => {
        expect(resetKeys()).toBeUndefined();
    });
});
