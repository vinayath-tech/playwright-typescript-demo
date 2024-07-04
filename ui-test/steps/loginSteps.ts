import { Page } from "@playwright/test";
import BaseSteps from "./baseSteps";

export default class LoginSteps extends BaseSteps {

    constructor(page: Page){
        super(page);
    }

    async verifyLogin(expText: string):Promise<void> {
        await this.loginPage.goToLandinPage();
        await this.loginPage.verifySuccessfullLogin(expText);
    }

    async verifyInvalidLogin():Promise<void> {
        const errorMsg = "Epic sadface: Username and password do not match any user in this service";
        
        await this.loginPage.goToLoginPage();
        await this.loginPage.loginWithInvalidCredentials();
        await this.loginPage.verifyErrorMessages(errorMsg);
    }
}