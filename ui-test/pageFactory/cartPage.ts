import { expect, Locator, Page } from '@playwright/test';
import jsonData from "../../test-data/data.json";


export class CartPage {
    readonly page: Page;
    readonly removeBackPackBtn: Locator;
    readonly cartTitleEle: Locator;
    readonly continueBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly itemCount: Locator;
    readonly cartEle: Locator;
    readonly productTitleEle: Locator;
    readonly productDescEle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitleEle = page.getByText('Your Cart');
        this.removeBackPackBtn = page.locator('#remove-sauce-labs-backpack');
        this.continueBtn = page.getByRole('button', { name: 'Continue Shopping'});
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout'});
        this.itemCount = page.locator('.inventory_item_name');
        this.cartEle = page.locator('.shopping_cart_badge');
        this.productTitleEle = page.locator('#item_5_title_link div.inventory_item_name');
        this.productDescEle = page.locator('.cart_item_label div.inventory_item_desc');
    }

    async checkCartPageNavigation(): Promise<void> {
        await expect(this.cartTitleEle).toBeVisible();
        await expect(this.removeBackPackBtn).toBeVisible();
        await expect(this.continueBtn).toBeVisible();
        await expect(this.checkoutBtn).toBeVisible();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }

    async checkProductRemovalfromCartPage(): Promise<void> {
        await expect(this.itemCount).toHaveCount(2);
        await this.removeBackPackBtn.click();
        
        await expect(this.removeBackPackBtn).toBeHidden();
        await expect(this.itemCount).toHaveCount(1);
        await expect(this.cartEle).toHaveText('1');
    }

    async checkItemDetailsOnCartPage(): Promise<void> {
        await expect(this.productTitleEle).toHaveText(jsonData.secondProductName);
        await expect(this.productDescEle).toContainText(jsonData.productDescText);
    }
}