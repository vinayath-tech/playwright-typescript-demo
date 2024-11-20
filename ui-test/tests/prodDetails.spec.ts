import { test } from "../../lib/baseTest";

test.describe("Verify Product details page @ui-test", () => {

    test.beforeEach('Test set up', async ({ productSteps }) => {
        await productSteps.navigateToLandingPage();
    });

    test('Check contents on product details page', async ({ prodDetailsSteps }) => {
        await prodDetailsSteps.navigateToProdDetails();
    })

})