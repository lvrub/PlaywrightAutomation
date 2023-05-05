const { When, Then, Given } = require("@cucumber/cucumber");
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


// // wait untill untill the locator will be presented
// console.log(await page.locator("[style*='block']").textContent());
// await expect(page.locator("[style*='block']")).toContainText('Incorrect')

Given('a login to Ecommerce2 appl with {string} and {string}', async function (userName, password) {
    const userName1 = this.page.locator('#username');
    const sighIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName1.type(userName);
    await this.page.locator('#password').type(password);
    await sighIn.click();
});

Then('Verify Error message is diplayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});