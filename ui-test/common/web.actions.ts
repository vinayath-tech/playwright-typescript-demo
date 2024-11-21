import { expect, Page } from "@playwright/test";

export class WebAction {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(expUrl: string) {
        await this.page.goto(expUrl);
    }

    async verifyText(eleLocator: string, expText: string) {
        await expect(this.page.locator(eleLocator))
            .toHaveText(expText);
    }

    async verifyEleCountByLocator(eleLocator: string, expCount: number) {
        await expect(this.page.locator(eleLocator)).toHaveCount(expCount);
    }

    async verifyEleCountByRole(eleName: string, expCount: number) {
        await expect(this.page.getByRole('button', {name: eleName})).toHaveCount(expCount);
    }

    async enterText(eleLocator: string, inputText: string) {
        await this.page.locator(eleLocator).fill(inputText);
    }

    async enterTextByPlaceHolder(eleName: string, inputText: string) {
        await this.page.getByPlaceholder(eleName).fill(inputText);
    }

    async clickElement(eleLocator: string) {
        await this.page.locator(eleLocator).click();
    }

    async clickElementByText(eleText: string) {
        await this.page.getByText(eleText).click();
    }

    async clickElementByRole(eleName: string) {
        await this.page.getByRole('button', { name: eleName}).click();
    }

    async verifyElementVisibility(eleLocator: string) {
        await expect(this.page.locator(eleLocator)).toBeVisible();
    }

    async chooseOption(eleLocator: string, valText: string) {
        await this.page.locator(eleLocator).selectOption(valText);
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async areArraysEqual(arr1: string[], arr2: string[]): Promise<boolean> {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((value, index) => value === arr2[index]);
    }

}