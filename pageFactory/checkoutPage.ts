/*eslint-disable no-useless-escape */
import { expect, Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../test-data/data.json";


export class CheckoutPage {

    readonly page: Page;
    readonly fname: Locator;
    readonly lname: Locator;
    readonly postCode: Locator;
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
        this.fname = page.getByPlaceholder('First Name');
        this.lname = page.getByPlaceholder('Last Name');
        this.postCode = page.getByPlaceholder('Zip/Postal Code');
        this.checkoutContinueBtn = page.getByRole('button', { name: 'Continue'});
        this.itemNameList = page.locator('.inventory_item_name');
        this.paymentSummaryInfoEle = page.locator('.summary_info_label');
        this.paymentSummaryValueEle = page.locator('.summary_value_label');
        this.subTotalEle = page.locator('.summary_subtotal_label');
        this.totalEle = page.locator('.summary_total_label');
        this.finishBtn = page.getByRole('button', { name: 'Finish'});
        this.confirmationEle = page.getByText(jsonData.confirmationMsg);
        this.backBtn = page.getByRole('button', {name: 'Back Home'});
    }

    async goToCheckoutPage() {
        await this.page.goto('/checkout-step-one.html');
    }

    async goToFinalCheckoutPage() {
        await this.page.goto('/checkout-step-two.html');
    }

    async fillPersonalDetails() {
        await this.fname.fill(faker.person.firstName());
        await this.lname.fill(faker.person.lastName());
        await this.postCode.fill(faker.location.zipCode());
        await this.checkoutContinueBtn.click();
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