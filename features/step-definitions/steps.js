const {When, Then, Given } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce appl with {string} and {string}', { timeout: 100 * 1000 },
    async function (username, password) {

        const loginP = this.pManager.getLoginPage();
        await loginP.goTo("https://rahulshettyacademy.com/client");
        await loginP.validLogin(username, password);
        await this.page.waitForTimeout(3000);
    });
When('Add {string} to Cart', async function (productName) {
    this.dPage = this.pManager.getDashboardPage();
    await this.dPage.searchProductAddCart(productName);
    await this.dPage.navigateToCart();
});
Then('Verify {string} is diplayed in the Cart', async function (productName) {
    const cPage = this.pManager.getCartPage();
    await cPage.VerifyProductIsDisplayed(productName);
    await cPage.Checkout();
});
When('Enter valid details and place the Order', async function () {
    this.orPage = this.pManager.getOrdersReviewPage();
    await this.orPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.orPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});
Then('Verify the order is presented in Order HIstory', async function () {
    const ohPage = this.pManager.getOrdersHistoryPage()
    await this.dPage.navigateToOrders();
    await ohPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ohPage.getOrderId())).toBeTruthy();

});
