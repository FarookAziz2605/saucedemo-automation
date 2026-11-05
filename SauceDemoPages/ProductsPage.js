import { expect } from "@playwright/test";

export class ProductPage {
    constructor(page) {
        this.productSort = page.locator('.product_sort_container');
        this.productPrice = page.locator('.inventory_item_price');
        this.productName = page.locator('.inventory_item_name');
    }

    async getNames () {
        return await this.productName.allTextContents();
    }
    async getPrices() {
        return (await this.productPrice.allTextContents()).map(str => Number(str.replace('$', '')));
    }

    async sortProduct(value) {
        await this.productSort.selectOption(value);
        await expect(this.productSort).toHaveValue(value);
    }

}

