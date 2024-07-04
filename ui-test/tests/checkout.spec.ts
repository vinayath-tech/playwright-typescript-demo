import { test } from '../../lib/baseTest';


test.describe('Checkout a product successfully @ui-test', async() => {

    test.beforeEach('Test set up', async({ productSteps }) => {
        await productSteps.addMultipleProductsToCart();
    });

   
    test('Place an order for the products',async ({ cartSteps, checkoutSteps }) => {
        await cartSteps.addToCheckout();
        await checkoutSteps.buyAProductSuccessfully();
    });
});