import {test, expect} from '@playwright/test';
import { LoginPage } from '../SauceDemoPages/LoginPage';
import { CartPage } from '../SauceDemoPages/CartPage';
import {CheckOutPage} from '../SauceDemoPages/CheckOutPage'

test('end to end flow to checkout', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const cartPage = new CartPage(page);
    await cartPage.addBackPackToCart();
    await cartPage.goToCart();

    const checkOutPage = new CheckOutPage(page);
    await checkOutPage.goToCheckout();
    await checkOutPage.fillTheDetails("Arnold", "Arnold Schwarzenegger", "122312");
    await checkOutPage.finishPurchase();
    
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await checkOutPage.backToHome();



})