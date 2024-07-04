import { Page } from "@playwright/test";
import BaseSteps from "./baseSteps";


export default class CartSteps extends BaseSteps {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
    }

    async addToCheckout() {
        await this.cartPage.clickCheckout();
    }

    async verifyCartElements() {
        await this.cartPage.checkCartPageNavigation();
    }


    async verifyCartDetails() {
        await this.cartPage.checkProductRemovalfromCartPage();
        await this.cartPage.checkItemDetailsOnCartPage();
    }
    
}