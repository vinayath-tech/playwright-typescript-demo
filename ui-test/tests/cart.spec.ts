import { test } from "../../lib/baseTest";

test.describe("Verify cart page @ui-test", () => {

    test.beforeEach('Test set up', async({ productSteps }) => {
        await productSteps.addMultipleProductsToCart();
    });

    test('Verify cart page Elements', async({ cartSteps }) => {
        await cartSteps.verifyCartElements();
    });

    test('Verify if a product can be successfully removed from cart page', async({ cartSteps }) => {
        await cartSteps.verifyCartDetails();
    })
})