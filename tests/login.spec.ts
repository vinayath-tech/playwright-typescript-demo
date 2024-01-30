import exp from "constants";
import { expect, test } from "../lib/baseTest";

test.describe('Login into an application', () => {

    test('Login with valid credentials', async({ loginPage }) => {
        await loginPage.goToLandinPage();
        await loginPage.verifySuccessfullLogin('Swag Labs');
    });

    test('Login with Invalid credentials', async({ loginPage, makeAxeBuilder }) => {
        const errorMsg = "Epic sadface: Username and password do not match any user in this service";
        
        await loginPage.goToLoginPage();

        //Accessibility scanning on a page
        const accessibilityScanResults = await makeAxeBuilder().analyze();
        // expect(accessibilityScanResults.violations).toEqual([]);

        await loginPage.loginWithInvalidCredentials();
        await loginPage.verifyErrorMessages(errorMsg);
    });
});