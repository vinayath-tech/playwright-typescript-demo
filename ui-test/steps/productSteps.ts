import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";
import { WebAction } from "../common/web.actions";

let webAction: WebAction;

export default class ProductSteps extends BaseSteps {

    constructor(page: Page) {
        super(page);
        webAction = new WebAction(page);
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

    verifyPriceSortLowToHigh = async():Promise<void> => {
        await test.step(`Sort price by high to low`, async() =>{
            await this.productsPage.sortByHighToLow();

            //Assign arrays to store price details
            const actPrices: string[] = [];
            const expPrices: string[] = ['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99'];
    
            //Loop through price element and capture all values in array
            for (const totEle of await this.page.locator('.inventory_item_price').all()) {
                actPrices.push(await totEle.textContent());
            }
    
            //Compare expected and actual array values to verify sorting behaviour
            if(!webAction.areArraysEqual(actPrices, expPrices)) {
                throw new Error('Sorting feature failed');
            } 
        })
    }
}