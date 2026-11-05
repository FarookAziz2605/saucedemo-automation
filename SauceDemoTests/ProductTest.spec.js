import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage.js';
import { ProductPage } from '../SauceDemoPages/ProductsPage.js';

let loginPage;

let productPage;
let productNames;
let productPrices;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    productPage = new ProductPage(page);
    productNames= await productPage.getNames();
    productPrices= await productPage.getPrices();
})


test.describe('Testing Sort functionality by comparing product details', () => {

    test('Checking A to Z', async({page}) => {

        const expectedNames = [...productNames].sort((a, b) => a.localeCompare(b));
        await productPage.sortProduct('az');
        const currentNames = await productPage.getNames();
        await expect(currentNames).toEqual(productNames);
    })

    test('Checking Z to A', async({page}) => {
        const expectedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        await productPage.sortProduct('za');
        const currentNames = await productPage.getNames();
        await expect(currentNames).toEqual(expectedNames);
    })

    test('Checking Hight to Low', async({page}) => {
        const expectedPrice = [...productPrices].sort((a, b) => b - a);
        await productPage.sortProduct('hilo');
        const currentPrices = await productPage.getPrices();
        await expect(currentPrices).toEqual(expectedPrice);
    })

    test('Checking Low to high', async({page}) => {
        const expectedPrice = [...productPrices].sort((a, b) => a - b);
        await productPage.sortProduct('lohi');
        const currentPrices = await productPage.getPrices();
        await expect(currentPrices).toEqual(expectedPrice);
    })
})