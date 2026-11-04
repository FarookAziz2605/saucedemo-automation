export class CartPage {
    constructor(page) {
        this.page = page;
        this.addToCartBag= page.locator('#add-to-cart-sauce-labs-backpack');
        this.cart = page.locator('.shopping_cart_link');

    }

    async addBackPackToCart() {
        await this.addToCartBag.click();
    }

    async addProduct(productId) {
        await this.page.locator(`#add-to-cart-${productId}`).click();
    }
    
    async removeProduct(productId) {
        
        await this.page.locator(`#remove-${productId}`).click();
    }
    async goToCart() {
        await this.cart.click();
    }
}