import {test, expect} from '../fixtures.js'
import { CartPage } from '../SauceDemoPages/CartPage';
import {CheckOutPage} from '../SauceDemoPages/CheckOutPage'

test('end to end flow to checkout', async({loggedInPage}) => {

    const cartPage = new CartPage(loggedInPage.page);
    await cartPage.addBackPackToCart();
    await cartPage.goToCart();

    const checkOutPage = new CheckOutPage(loggedInPage.page);
    await checkOutPage.goToCheckout();
    await checkOutPage.fillTheDetails("Arnold", "Arnold Schwarzenegger", "122312");
    await checkOutPage.finishPurchase();
    
    await expect(loggedInPage.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await checkOutPage.backToHome();

})