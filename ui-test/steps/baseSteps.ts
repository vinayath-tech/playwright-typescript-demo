
import { Page } from "@playwright/test";
import { LoginPage } from "../pageFactory/loginPage";
import { ProductsPage } from "../pageFactory/productsPage";
import { CartPage } from "../pageFactory/cartPage";
import { CheckoutPage } from "../pageFactory/checkoutPage";
import { ProdDetailsPage } from "../pageFactory/prodDetailsPage";

export default class BaseSteps {

    readonly page: Page;
    protected loginPage: LoginPage;
    protected productsPage: ProductsPage;
    protected cartPage: CartPage;
    protected checkoutPage: CheckoutPage;
    protected prodDetailsPage: ProdDetailsPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.prodDetailsPage = new ProdDetailsPage(this.page);
    }
}