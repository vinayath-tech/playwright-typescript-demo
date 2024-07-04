import { Page } from '@playwright/test';
import { WebAction } from '../common/web.actions';

let webAction: WebAction;

export class LoginPage {

    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async goToLandinPage(): Promise<void> {
        await webAction.navigateToUrl("/inventory.html");
    }

    async goToLoginPage(): Promise<void> {
        await webAction.navigateToUrl("/");
    }

    async verifySuccessfullLogin(expTitle: string): Promise<void> {
        await webAction.verifyText('.header_label div', expTitle);
    }

    async loginWithInvalidCredentials(): Promise<void> {
        await webAction.enterText('#user-name', 'standaard_user');
        await webAction.enterText('#password', 'sauce');
        await webAction.clickElement('#login-button');
        
    }

    async verifyErrorMessages(errorMsg: string): Promise<void> {
        await webAction.verifyText('[data-test="error"]', errorMsg);
    }
}