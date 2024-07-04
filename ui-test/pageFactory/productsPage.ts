import { expect, Locator, Page } from "@playwright/test";
import jsonData from "../../test-data/data.json";

export class ProductsPage {

    readonly page: Page;
    readonly itemCount: Locator;
    readonly addFirstItem: Locator;
    readonly addSecondItem: Locator;
    readonly cartEle: Locator;
    readonly firstProductNameEle: Locator;
    readonly secondProductNameEle: Locator;
    readonly cartBtn: Locator;

    hyphenatedStr = (str: string) => str.replace(/\s+/g, "-").toLowerCase();

    constructor(page: Page) {
        this.page = page;
        this.itemCount = page.locator('.inventory_list .inventory_item');
        this.addFirstItem = page.locator(`[data-test='add-to-cart-${this.hyphenatedStr(jsonData.firstProductName)}']`);
        this.addSecondItem = page.locator(`[data-test='add-to-cart-${this.hyphenatedStr(jsonData.secondProductName)}']`);
        this.cartEle = page.locator('.shopping_cart_badge');
        this.firstProductNameEle = page.locator('#item_4_title_link div.inventory_item_name');
        this.secondProductNameEle = page.locator('#item_5_title_link div.inventory_item_name');
        this.cartBtn =  page.getByRole('button', { name: 'Add to cart'});
    }

    async goToProductDetailPage(): Promise<void> {
        await this.page.goto('/inventory-item.html?id=4');
    }

    async goToLandinPage(): Promise<void> {
        await this.page.goto("/inventory.html");
    }

    async verifyProductCount(): Promise<void> {
        await expect(this.itemCount).toHaveCount(6);
    }

    async includeMultipleProductsToCart(): Promise<void> {
        await this.addFirstItem.click();
        await this.addSecondItem.click();

        await expect(this.page.getByRole('button', {name: 'Remove'})).toHaveCount(2);
    }

    async checkCartForTotalProducts(): Promise<void> {
        await expect(this.cartEle).toHaveText('2');
    }

    async clickCartEle(): Promise<void> {
        await this.cartEle.click();
    }

    async verifySelectedProductsInCart() {
        await expect(this.firstProductNameEle).toHaveText(jsonData.firstProductName);
        await expect(this.secondProductNameEle).toHaveText(jsonData.secondProductName);
    }

    async addProductToCart() {
        await this.cartBtn.click();
    }

}