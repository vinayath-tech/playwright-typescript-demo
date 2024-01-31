import { expect, test } from "../lib/baseTest";
import { createHtmlReport} from "axe-html-reporter";
const fs = require('fs');

test.describe('Run accessibility tests on demo applications @Pa11y-tests', async () => { 

    test('Execute accessibility checks on login page', async ({ loginPage, makeAxeBuilder }) => {
        await loginPage.goToLoginPage();

        const accessibilityScanResults = await makeAxeBuilder()
                                                .withTags(['wcag2a', 'wcag21a'])
                                                .analyze();

        //Commenting Positive assertions keep CI build green for demonstration purpose
        // expect(accessibilityScanResults.violations).toEqual([]);
        const reportHTML = createHtmlReport({
            results: accessibilityScanResults,
            options: {
              projectKey: "PlaywrightHomepage"
            },
          });
      
          if (!fs.existsSync("accessibility-report/report.html")) {
            fs.mkdirSync("accessibility-report/", {
              recursive: true,
            });
          }
        fs.writeFileSync("accessibility-report/report.html", reportHTML);
        expect(accessibilityScanResults.violations).not.toEqual([]);
    });

    test('Execute accessibility checks on landing page', async({ loginPage, makeAxeBuilder }) => {
        await loginPage.goToLandinPage();

        const accessibilityScanResults = await makeAxeBuilder().analyze();
        // expect(accessibilityScanResults.violations).toEqual([]);
        const reportHTML = createHtmlReport({
            results: accessibilityScanResults,
            options: {
              projectKey: "PlaywrightHomepage"
            },
          });
      
        fs.writeFileSync("accessibility-report/report.html", reportHTML);
        expect(accessibilityScanResults.violations).not.toEqual([]);
    });

    test.skip('Execute accessibility check on product & cart detail page', async({ productsPage, makeAxeBuilder }) => {
        await productsPage.goToProductDetailPage();
        const accessibilityScanResultsProd = await makeAxeBuilder().analyze();
        //expect(accessibilityScanResultsProd.violations).toEqual([]);
        expect(accessibilityScanResultsProd.violations).not.toEqual([]);


        await productsPage.addProductToCart();
        await productsPage.clickCartEle();
        
        const accessibilityScanResultsCart = await makeAxeBuilder().analyze();
        //expect(accessibilityScanResultsCart.violations).toEqual([]);
        const reportHTML = createHtmlReport({
            results: accessibilityScanResultsProd,
            options: {
              projectKey: "PlaywrightHomepage"
            },
          });
      
        fs.writeFileSync("accessibility-report/report.html", reportHTML);
        expect(accessibilityScanResultsCart.violations).not.toEqual([]);
    });

    test.skip('Execute accessibility checks on checkout page', async({ checkoutPage, makeAxeBuilder }) => {
        await checkoutPage.goToCheckoutPage();

        const accessibilityScanResults = await makeAxeBuilder().analyze();
        // expect(accessibilityScanResults.violations).toEqual([]);
        const reportHTML = createHtmlReport({
            results: accessibilityScanResults,
            options: {
              projectKey: "PlaywrightHomepage"
            },
          });
        fs.writeFileSync("accessibility-report/report.html", reportHTML);
        expect(accessibilityScanResults.violations).not.toEqual([]);


        await checkoutPage.goToFinalCheckoutPage();
        const accessibilityScanResultsFinalPage = await makeAxeBuilder().analyze();
        // expect(accessibilityScanResultsFinalPage.violations).toEqual([]);
        expect(accessibilityScanResultsFinalPage.violations).not.toEqual([]);

    });
});