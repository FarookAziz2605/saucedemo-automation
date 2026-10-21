import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage.js';
import { CartPage } from '../SauceDemoPages/CartPage.js';

test('End to end flow to cart', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const cartPage = new CartPage(page);
    await cartPage.addBackPackToCart();
    await cartPage.goToCart();

    await expect(page.locator('.title')).toHaveText('Your Cart');

    
})