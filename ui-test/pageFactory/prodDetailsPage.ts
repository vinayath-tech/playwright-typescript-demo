import { Page } from "@playwright/test";
import { WebAction } from "../common/web.actions";
import productData from "../../test-data/prod.content.json";


let webAction: WebAction;

export class ProdDetailsPage {

    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async clickOnProductTitle():Promise<void> {

        await webAction.delay(2000);
        await webAction.clickElementByText(productData.nameText);
    }

    async verifyNavigationToDetailsPage():Promise<void> {

        await webAction.verifyText("[data-test='back-to-products']", productData.backLinkText);
        await webAction.verifyText("[data-test='inventory-item-name']", productData.nameText);
        await webAction.verifyText("[data-test='inventory-item-price']", productData.price);
        await webAction.verifyElementVisibility("#add-to-cart");
    }

}