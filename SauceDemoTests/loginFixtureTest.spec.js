import {test, expect} from '../fixtures.js';

test('Testing login with fixture', async({loggedInPage}) => {
    await expect(loggedInPage.page).toHaveURL(/inventory.html/);
});