import {test, expect} from '@playwright/test';
import {LoginPage} from '../SauceDemoPages/LoginPage.js'

test('Testing if Screenshort works', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page.locator('.title')).toHaveText('Products');

    //await expect(page.locator('.title')).toHaveText('Productz'); ---This will become an error and it takes screenshot
})