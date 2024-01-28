import { test } from '../lib/baseTest';


test.describe('Checkout a product successfully', async() => {

    test.beforeEach('Test set up', async({ productsPage }) => {
        await productsPage.goToLandinPage();
        await productsPage.addMultipleProductsToCart();
        await productsPage.clickCartEle();
    });

   
    test('Place an order for the products',async ({ cartPage, checkoutPage }) => {
        await cartPage.clickCheckout();
        await checkoutPage.fillPersonalDetails();
        await checkoutPage.verifyCheckoutSummary();
        await checkoutPage.verifyProductSubTotal();
        await checkoutPage.verifyConfirmationMsg();
    });
});