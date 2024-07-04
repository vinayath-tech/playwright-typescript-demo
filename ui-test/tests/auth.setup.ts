import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../../config/playwright.config';
import ENV from '../../lib/env';

setup('Authenticate application', async({ page }) => {
    const uname = ENV.TEST_USERNAME || '';
    const pword = ENV.PASSWORD || '';

    await page.goto("/");
    await page.locator('#user-name').fill(uname);
    await page.locator('#password').fill(pword);
    await page.locator('#login-button').click(); 

    await expect(page.locator('.header_label div')).toHaveText('Swag Labs');
    await page.waitForLoadState('networkidle');

    await page.context().storageState({ path: STORAGE_STATE });
});