import { test } from "../lib/baseTest";

test.describe('Login into an application @ui-test', () => {

    test('Login with valid credentials', async({ loginPage }) => {
        await loginPage.goToLandinPage();
        await loginPage.verifySuccessfullLogin('Swag Labs');
    });

    test('Login with Invalid credentials', async({ loginPage }) => {
        const errorMsg = "Epic sadface: Username and password do not match any user in this service";
        
        await loginPage.goToLoginPage();
        await loginPage.loginWithInvalidCredentials();
        await loginPage.verifyErrorMessages(errorMsg);
    });
});