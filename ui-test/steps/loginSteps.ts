import { Page } from "@playwright/test";
import { test } from "../../lib/baseTest";
import BaseSteps from "./baseSteps";

export default class LoginSteps extends BaseSteps {

    constructor(page: Page){
        super(page);
    }

    verifyLogin = async(expText: string):Promise<void> => {
        await test.step(`Verify login on the site`, async() => {
            await this.loginPage.goToLandinPage();
            await this.loginPage.verifySuccessfullLogin(expText);
        });
    }

    verifyInvalidLogin =  async():Promise<void> => {
        await test.step(`Verify Invalid login on the site`, async() => {
            const errorMsg = "Epic sadface: Username and password do not match any user in this service";
        
            await this.loginPage.goToLoginPage();
            await this.loginPage.loginWithInvalidCredentials();
            await this.loginPage.verifyErrorMessages(errorMsg);
        });
    }
}