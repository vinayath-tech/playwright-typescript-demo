import { test as baseTest } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { LoginPage } from '../pageFactory/loginPage';
import { ProductsPage } from '../pageFactory/productsPage';
import { CartPage } from '../pageFactory/cartPage';
import { CheckoutPage } from '../pageFactory/checkoutPage';
import { STORAGE_STATE } from '../config/playwright.config';


type MyFixtures = {
    loginPage: LoginPage,
    productsPage: ProductsPage,
    checkoutPage: CheckoutPage,
    cartPage: CartPage,
    makeAxeBuilder: () => AxeBuilder

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
    },

    makeAxeBuilder: async ({ page }, use) => {
        const makeAxeBuilder = () => new AxeBuilder({ page });
        await use(makeAxeBuilder);
    }

});

export { expect } from '@playwright/test';