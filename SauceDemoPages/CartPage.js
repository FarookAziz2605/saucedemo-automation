export class CartPage {
    constructor(page) {
        this.addToCartBag= page.locator('#add-to-cart-sauce-labs-backpack');
        this.cart = page.locator('.shopping_cart_link');

    }

    async addBackPackToCart() {
        await this.addToCartBag.click();
    }
    async goToCart() {
        await this.cart.click();
    }
}