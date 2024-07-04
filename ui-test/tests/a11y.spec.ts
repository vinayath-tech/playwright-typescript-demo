import { test } from "../../lib/baseTest";
// import { Helper } from "../lib/helper";
import { checkPa11y } from "../../helpers/pa11yHelper"; 

test.describe('Run accessibility tests on demo applications @Pa11y-tests', async () => { 

    test('Execute accessibility checks on login page', async ({ loginSteps, makeAxeBuilder }) => {
        await loginSteps.verifyLogin('Swag Labs');
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility checks on landing page', async({ loginSteps, makeAxeBuilder }) => {
        await loginSteps.verifyLogin('Swag Labs');
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility check on product & cart detail page', async({ productSteps, makeAxeBuilder }) => {
        await productSteps.navigateToDetailsPage();
        await checkPa11y(makeAxeBuilder);

        await productSteps.navigateToCartsPage();
        await checkPa11y(makeAxeBuilder);
    });

    test('Execute accessibility checks on checkout page', async({ checkoutSteps, makeAxeBuilder }) => {
        await checkoutSteps.navigateToCheckoutPage();
        await checkPa11y(makeAxeBuilder);


        await checkoutSteps.navigateToFinalCheckoutPage();
        await checkPa11y(makeAxeBuilder);

    });
});