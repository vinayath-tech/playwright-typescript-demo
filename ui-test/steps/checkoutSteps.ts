import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";

export default class CheckoutSteps extends BaseSteps {

    constructor(page: Page) {
        super(page);
    }

 
    buyAProductSuccessfully = async(): Promise<void> => {
        await test.step(`Buy a product by entering personal details`, async() => {
            await this.checkoutPage.fillPersonalDetails();
            await this.checkoutPage.verifyCheckoutSummary();
            await this.checkoutPage.verifyProductSubTotal();
            await this.checkoutPage.verifyConfirmationMsg();
        });
    }
    
    navigateToCheckoutPage = async():Promise<void> => {
        await test.step(`Navigate to checkout page`, async() => {
            await this.checkoutPage.goToCheckoutPage();
        });
    }


    navigateToFinalCheckoutPage = async():Promise<void> => {
        await test.step(`Navigate to Final checkout page`, async() => {
            await this.checkoutPage.goToFinalCheckoutPage();
        });
    }
}