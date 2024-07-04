import { Page } from "@playwright/test";
import BaseSteps from "./baseSteps";

export default class ProductSteps extends BaseSteps {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
    }

    async navigateToLandingPage() {
        await this.productsPage.goToLandinPage();
    }

    async navigateToDetailsPage() {
        await this.productsPage.goToProductDetailPage();
    }

    async checkProdCount() {
        await this.productsPage.verifyProductCount();
    }

    async addMultipleProductsToCart() {
        await this.productsPage.goToLandinPage();
        await this.productsPage.includeMultipleProductsToCart();
        await this.productsPage.clickCartEle();
    }

    async navigateToCartsPage() {
        await this.productsPage.addProductToCart();
        await this.productsPage.clickCartEle();
    }
}