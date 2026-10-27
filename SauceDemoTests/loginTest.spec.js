import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage';

let loginPage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});
test ('Valid login', async({page}) => {
    //Valid login
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    
});

test ('Invalid login', async({page}) => {
    //Invalid Login
    await loginPage.login('Invalid_Username', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toBeEnabled();
    //To check if statement also correct
     await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
    //datatest
});
test ('locked out user', async ({page}) => {
    //Lockedout user
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    //datatest
});

test.afterEach(async({page}) => {
    console.log("Test finished");
});