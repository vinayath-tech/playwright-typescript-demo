import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pageFactory/loginPage';
import { ProductsPage } from '../pageFactory/productsPage';
import { CartPage } from '../pageFactory/cartPage';
import { CheckoutPage } from '../pageFactory/checkoutPage';
import { STORAGE_STATE } from '../playwright.config';


type MyFixtures = {
    loginPage: LoginPage,
    productsPage: ProductsPage,
    checkoutPage: CheckoutPage,
    cartPage: CartPage;

};

export const test = baseTest.extend<MyFixtures>({
    loginPage:async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: STORAGE_STATE});
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        await use(loginPage);
        await context.close();
    },

    productsPage:async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage:async ({ page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage:async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }

});

export { expect } from '@playwright/test';