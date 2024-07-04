import { test } from "../../lib/baseTest";

test.describe('Login into an application @ui-test', () => {

    test('Login with valid credentials', async({ loginSteps }) => {
        await loginSteps.verifyLogin('Swag Labs');
    });

    test('Login with invalid credentials', async({ loginSteps }) => {
        await loginSteps.verifyInvalidLogin();
    });
});