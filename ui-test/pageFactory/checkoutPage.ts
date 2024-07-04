/*eslint-disable no-useless-escape */
import { expect, Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../../test-data/data.json";
import { WebAction } from "../common/web.actions";

let webAction: WebAction;

export class CheckoutPage {

    readonly page: Page;
    readonly checkoutContinueBtn: Locator;
    readonly itemNameList: Locator;
    readonly paymentSummaryInfoEle: Locator;
    readonly paymentSummaryValueEle: Locator;
    readonly subTotalEle: Locator;
    readonly totalEle: Locator;
    readonly finishBtn: Locator;
    readonly confirmationEle: Locator;
    readonly backBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.itemNameList = page.locator('.inventory_item_name');
        this.paymentSummaryInfoEle = page.locator('.summary_info_label');
        this.paymentSummaryValueEle = page.locator('.summary_value_label');
        this.subTotalEle = page.locator('.summary_subtotal_label');
        this.totalEle = page.locator('.summary_total_label');
        this.finishBtn = page.getByRole('button', { name: 'Finish'});
        this.confirmationEle = page.getByText(jsonData.confirmationMsg);
        this.backBtn = page.getByRole('button', {name: 'Back Home'});

        webAction = new WebAction(this.page);
    }

    async goToCheckoutPage() {
        await webAction.navigateToUrl('/checkout-step-one.html');
    }

    async goToFinalCheckoutPage() {
        await webAction.navigateToUrl('/checkout-step-two.html');
    }

    async fillPersonalDetails() {
        await webAction.enterTextByPlaceHolder('First Name', faker.person.firstName());
        await webAction.enterTextByPlaceHolder('Last Name', faker.person.lastName());
        await webAction.enterTextByPlaceHolder('Zip/Postal Code', faker.location.zipCode());

        await webAction.clickElementByRole('Continue');
    }

    async verifyCheckoutSummary() {
        await expect(this.itemNameList).toHaveText([jsonData.firstProductName, jsonData.secondProductName]);
        await expect(this.paymentSummaryInfoEle).toContainText(
            [
                jsonData.paymentInfo,
                jsonData.shippingInfo,
                jsonData.priceInfo
            ]
        );
        await expect(this.paymentSummaryValueEle).toContainText(
            [
                jsonData.paymentValue,
                jsonData.shippingValue
            ]
        );
    }

    async verifyProductSubTotal():Promise<void> {

       const subTotalValText =  await this.subTotalEle.textContent();
       const subTotVal = subTotalValText!.replace(/[^0-9\.]+/g, '');
       expect(subTotVal).toEqual(jsonData.subTotal);
    }

    async verifyProductTotal():Promise<void> {

        const totalValText = await this.totalEle.textContent();
        const totVal = totalValText!.replace(/[^0-9\.]+/g, '');
        expect(totVal).toEqual(jsonData.total);
    }

    async verifyConfirmationMsg():Promise<void> {
        await this.finishBtn.click();
        expect(this.confirmationEle).toBeVisible();
        expect(this.backBtn).toBeVisible();
    }
}