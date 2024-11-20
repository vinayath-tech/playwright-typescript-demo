import { test as baseTest } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { STORAGE_STATE } from '../config/playwright.config';
import LoginSteps from '../ui-test/steps/loginSteps';
import ProductSteps from '../ui-test/steps/productSteps';
import CartSteps from '../ui-test/steps/cartSteps';
import CheckoutSteps from '../ui-test/steps/checkoutSteps';
import ProdDetailsSteps from '../ui-test/steps/prodDetailsSteps';

type MyFixtures = {
    loginSteps: LoginSteps,
    productSteps: ProductSteps,
    cartSteps: CartSteps,
    checkoutSteps: CheckoutSteps,
    prodDetailsSteps: ProdDetailsSteps,
    makeAxeBuilder: () => AxeBuilder

};

export const test = baseTest.extend<MyFixtures>({
    loginSteps:async ({ browser }, use) => {

        const context = await browser.newContext({ storageState: STORAGE_STATE });
        const page = await context.newPage();
        const loginSteps = new LoginSteps(page);
        await use(loginSteps);
        await context.close();
    },

    productSteps:async ({ page }, use) => {
        const productSteps = new ProductSteps(page);
        await use(productSteps);
    },

    cartSteps:async ({ page }, use) => {
        const cartSteps = new CartSteps(page);
        await use(cartSteps);
    },

    checkoutSteps: async ({ page }, use) => {
        const checkoutSteps =  new CheckoutSteps(page);
        await use(checkoutSteps);
    },

    prodDetailsSteps: async({ page }, use) => {
        const prodDetailsSteps =  new ProdDetailsSteps(page);
        await use(prodDetailsSteps);
    },

    makeAxeBuilder: async ({ page }, use) => {
        const makeAxeBuilder = () => new AxeBuilder({ page });
        await use(makeAxeBuilder);
    }

});

export { expect } from '@playwright/test';