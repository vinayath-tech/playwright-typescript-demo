import { test } from "../lib/baseTest";
// import { Helper } from "../lib/helper";
import { checkPa11y } from "../helpers/pa11yHelper"; 

test.describe('Run accessibility tests on demo applications @Pa11y-tests', async () => { 

    test('Execute accessibility checks on login page', async ({ loginPage, makeAxeBuilder }) => {
        await loginPage.goToLoginPage();
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility checks on landing page', async({ loginPage, makeAxeBuilder }) => {
        await loginPage.goToLandinPage();
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility check on product & cart detail page', async({ productsPage, makeAxeBuilder }) => {
        await productsPage.goToProductDetailPage();
        await checkPa11y(makeAxeBuilder);

        await productsPage.addProductToCart();
        await productsPage.clickCartEle();
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility checks on checkout page', async({ checkoutPage, makeAxeBuilder }) => {
        await checkoutPage.goToCheckoutPage();
        await checkPa11y(makeAxeBuilder);


        await checkoutPage.goToFinalCheckoutPage();
        await checkPa11y(makeAxeBuilder);

    });
});