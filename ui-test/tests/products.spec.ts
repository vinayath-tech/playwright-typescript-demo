import { test } from "../../lib/baseTest";

test.describe("Verify products home page @ui-test", () => {

    test.beforeEach('Test set up', async({ productSteps }) => {
        await productSteps.navigateToLandingPage();
    })

    test('Check total products', async({ productSteps }) => {
        await productSteps.checkProdCount();
    });

    test('Verify products can be sorted from price high to low', async({ productSteps }) => {
        await productSteps.verifyPriceSortLowToHigh();
    });

});
