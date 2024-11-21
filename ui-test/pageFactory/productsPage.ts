import { Page } from "@playwright/test";
import jsonData from "../../test-data/data.json";
import { WebAction } from "../common/web.actions";

let webAction: WebAction;

export class ProductsPage {

    readonly page: Page;
    hyphenatedStr = (str: string) => str.replace(/\s+/g, "-").toLowerCase();

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async goToProductDetailPage(): Promise<void> {
        await webAction.navigateToUrl('/inventory-item.html?id=4');
    }

    async goToLandinPage(): Promise<void> {
        await webAction.navigateToUrl('/inventory.html');
    }

    async verifyProductCount(): Promise<void> {
        await webAction.verifyEleCountByLocator('.inventory_list .inventory_item', 6);
    }

    async includeMultipleProductsToCart(): Promise<void> {
        await webAction.clickElement(`[data-test='add-to-cart-${this.hyphenatedStr(jsonData.firstProductName)}']`);
        await webAction.clickElement(`[data-test='add-to-cart-${this.hyphenatedStr(jsonData.secondProductName)}']`);

        await webAction.verifyEleCountByRole('Remove', 2);
    }

    async checkCartForTotalProducts(): Promise<void> {
        await webAction.verifyEleCountByLocator('.shopping_cart_badge', 2);
    }

    async clickCartEle(): Promise<void> {
        await webAction.clickElement('.shopping_cart_badge');
    }

    async verifySelectedProductsInCart() {
        await webAction.verifyText('#item_4_title_link div.inventory_item_name', jsonData.firstProductName);
        await webAction.verifyText('#item_5_title_link div.inventory_item_name', jsonData.secondProductName);
    }

    async addProductToCart() {
        await webAction.clickElementByRole('Add to cart');
    }

    async sortByHighToLow() {
        await webAction.chooseOption('.product_sort_container', 'hilo');
    }

}