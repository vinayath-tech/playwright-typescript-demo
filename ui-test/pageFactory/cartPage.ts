import { expect, Locator, Page } from '@playwright/test';
import jsonData from "../../test-data/data.json";
import { WebAction } from '../common/web.actions';


let webAction: WebAction;

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

        webAction = new WebAction(this.page);
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
        await webAction.verifyEleCountByLocator('.inventory_item_name', 2);
        await webAction.clickElement('#remove-sauce-labs-backpack');
        
        await expect(this.removeBackPackBtn).toBeHidden();
        await webAction.verifyEleCountByLocator('.inventory_item_name', 1);
        await webAction.verifyText('.shopping_cart_badge', '1');
    }

    async checkItemDetailsOnCartPage(): Promise<void> {
        await webAction.verifyText('#item_5_title_link div.inventory_item_name', jsonData.secondProductName);
        await webAction.verifyText('.cart_item_label div.inventory_item_desc', jsonData.productDescText);
    }
}