import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage.js';
import { CartPage } from '../SauceDemoPages/CartPage.js';

let loginPage;
let cartPage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    cartPage = new CartPage(page);
    await cartPage.addBackPackToCart();
})

test('End to end flow to cart', async ({page}) => {

    await cartPage.goToCart();
    await expect(page.locator('.title')).toHaveText('Your Cart');  
})

test('Multiple products in cart', async({page}) => {
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await cartPage.goToCart();

    await expect(page.locator('.inventory_item_name')).toHaveCount(2);
    
}); 

test('To check if remove button works', async({page}) => {
    await page.locator('#add-to-cart-sauce-labs-bike-light').click(); 
    await cartPage.goToCart();

    await page.locator('#remove-sauce-labs-bike-light').click();
    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
});