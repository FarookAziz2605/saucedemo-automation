import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage';

let loginPage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
})

//Testing out, how to check count 
test('After logging in, check that there are exactly 6 products on the page:', async({page}) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('.inventory_item_name ')).toHaveCount(6);
})

//testing out, how to check value
test('After logging in, check the sort dropdown currently shows "lohi" (low to high)', async({page}) =>{
    await loginPage.login('standard_user', 'secret_sauce');
    await page.locator('.product_sort_container').selectOption('lohi');
    await expect(page.locator('.product_sort_container')).toHaveValue('lohi');
})

//Testing out, how to test if button is working
test('Check the login button is enabled on the login page:', async({page}) =>{
    await expect(page.locator('#login-button')).toBeEnabled();
})
