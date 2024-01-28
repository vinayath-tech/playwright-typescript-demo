import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly pageTitle: Locator;
    readonly errorField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user-name');
        this.passWord = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.pageTitle = page.locator('.header_label div');
        this.errorField = page.locator('[data-test="error"]');
    }

    async goToLandinPage(): Promise<void> {
        await this.page.goto("/inventory.html");
    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto("/");
    }

    async verifySuccessfullLogin(expTitle: string): Promise<void> {
        await expect(this.pageTitle).toHaveText(expTitle);
    }

    async loginWithInvalidCredentials(): Promise<void> {
        await this.userName.fill('standaard_user');
        await this.passWord.fill('sauce');
        await this.loginBtn.click();
    }

    async verifyErrorMessages(errorMsg: string): Promise<void> {
        await expect(this.errorField).toHaveText(errorMsg);
    }
}