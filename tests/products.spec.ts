import { test } from "../lib/baseTest";

test.describe("Verify products home page @ui-test", () => {

    test.beforeEach('Test set up', async({ productsPage }) => {
        await productsPage.goToLandinPage();
    })

    test('Check total products', async({ productsPage }) => {
        await productsPage.verifyProductCount();
    });

    //check if you can add a product to cart
    test('Verify if we can add products to the cart', async({ productsPage }) => {
        await productsPage.addMultipleProductsToCart();
        await productsPage.checkCartForTotalProducts();
        await productsPage.verifySelectedProductsInCart();
    });
});