import { Page } from "@playwright/test";
import BaseSteps from "./baseSteps";

export default class CheckoutSteps extends BaseSteps {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
    }

    async buyAProductSuccessfully() {
        await this.checkoutPage.fillPersonalDetails();
        await this.checkoutPage.verifyCheckoutSummary();
        await this.checkoutPage.verifyProductSubTotal();
        await this.checkoutPage.verifyConfirmationMsg();
    }

    async navigateToCheckoutPage() {
        await this.checkoutPage.goToCheckoutPage();
    }

    async navigateToFinalCheckoutPage() {
        await this.checkoutPage.goToFinalCheckoutPage();
    }
    
}