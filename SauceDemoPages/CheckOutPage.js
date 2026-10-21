export class CheckOutPage {
    constructor(page) {
        this.page = page;
        this.checkOutButton= page.locator('#checkout');

        this.firstName= page.locator('#first-name');
        this.lastName= page.locator('#last-name');
        this.postalCode= page.locator('#postal-code');
        this.continueButton= page.locator('#continue');

        this.finishButton= page.locator('#finish');
        this.backHomeButton= page.locator('#back-to-products')

    }

    async goToCheckout() {
        await this.checkOutButton.click();
    }

    async fillTheDetails(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);

        await this.continueButton.click();
    }

    async finishPurchase() {
        await this.finishButton.click();
    }

    async backToHome() {
        await this.backHomeButton.click();
    }
}