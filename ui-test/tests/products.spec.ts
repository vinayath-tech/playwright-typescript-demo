import { test } from "../../lib/baseTest";

test.describe("Verify products home page @ui-test", () => {

    test.beforeEach('Test set up', async({ productSteps }) => {
        await productSteps.navigateToLandingPage();
    })

    test('Check total products', async({ productSteps }) => {
        await productSteps.checkProdCount();
    })

});
