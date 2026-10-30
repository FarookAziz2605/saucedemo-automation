import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage';

const loginTestData = [
    {username: 'standard_user', password: 'secret_sauce', expectedURL: /inventory.html/, expectedText: 'Products'},
    {username: 'invalid_user', password: 'secret_sauce', errorMessage: 'Epic sadface: Username and password do not match any user in this service'},
    {username: 'locked_out_user', password: 'secret_sauce', errorMessage: 'Epic sadface: Sorry, this user has been locked out.'}
];

for (const testData of loginTestData) {

    test(`Login test - ${testData.username}`, async({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testData.username, testData.password);

        if (testData.expectedURL) {
            await expect(page).toHaveURL(testData.expectedURL);
            await expect(page.locator('.title')).toHaveText(testData.expectedText);

        } else {
            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText(testData.errorMessage);

        }
    })
    
};

test('Logout testing', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toHaveValue('Login');
}) 