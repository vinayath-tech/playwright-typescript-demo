import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";

export default class ProductSteps extends BaseSteps {

    constructor(page: Page) {
        super(page);
    }

    navigateToLandingPage = async():Promise<void> => {
        await test.step(`Navigate to landing page`, async() => {
            await this.productsPage.goToLandinPage();
        })
    }

    navigateToDetailsPage = async():Promise<void> => {
        await test.step(`Navigate to details page`, async() => {
            await this.productsPage.goToProductDetailPage();
        })
    }

    checkProdCount = async():Promise<void> => {
        await test.step(`Check product count`, async() => {
            await this.productsPage.verifyProductCount();
        });
    }

    addMultipleProductsToCart = async():Promise<void> => {
        await test.step(`Add multiple products to cart`, async() => {
            await this.productsPage.goToLandinPage();
            await this.productsPage.includeMultipleProductsToCart();
            await this.productsPage.clickCartEle();
        });
    }

    navigateToCartsPage = async():Promise<void> => {
        await test.step(`Navigate to carts page`, async() => {
            await this.productsPage.addProductToCart();
            await this.productsPage.clickCartEle();
        });
    }
}