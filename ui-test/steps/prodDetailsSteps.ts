import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";


export default class ProdDetailsSteps extends BaseSteps {

    constructor(page: Page) {
        super(page);
    }

    navigateToProdDetails = async():Promise<void> => {
        test.step(`Click on product title to navigate to details page`, async() => {
            await this.prodDetailsPage.clickOnProductTitle();
            await this.prodDetailsPage.verifyNavigationToDetailsPage();
        })
    }
}