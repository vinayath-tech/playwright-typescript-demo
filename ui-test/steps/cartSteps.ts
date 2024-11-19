import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";


export default class CartSteps extends BaseSteps {

    constructor(page: Page) {
        super(page);
    }

    addToCheckout = async(): Promise<void> => {
        await test.step(`Add a product to checkout`, async() => {
            await this.cartPage.clickCheckout();
        });
    }

    verifyCartElements = async():Promise<void> => {
        await test.step(`Check elements on cart page`, async() => {
            await this.cartPage.checkCartPageNavigation();
        })
    }

    verifyCartDetails = async():Promise<void> => {
        await test.step(`Verify delete actions on the cart page`, async() => {
            await this.cartPage.checkProductRemovalfromCartPage();
            await this.cartPage.checkItemDetailsOnCartPage();
        });
    }

}