import { test } from "../lib/baseTest";

test.describe("Verify cart page @ui-test", () => {

    test.beforeEach('Test set up', async({ productsPage }) => {
        await productsPage.goToLandinPage();
        await productsPage.addMultipleProductsToCart();
        await productsPage.clickCartEle();
    });

    test('Verify cart page containing products', async({ cartPage }) => {
        await cartPage.checkCartPageNavigation();
    });

    test('Verify if a product can be successfully removed from cart page', async({ cartPage }) => {
        await cartPage.checkProductRemovalfromCartPage();
        await cartPage.checkItemDetailsOnCartPage();
    })
})