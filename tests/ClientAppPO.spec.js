const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
const {customtest} = require('../utils/test-base');

// test('Browser Context-Validating Error login', async ({ page }) => {
//    const pManager = new POManager(page);

//    const loginP = new pManager.getLoginPage();
//    await loginP.goTo("https://rahulshettyacademy.com/client");
//    await loginP.validLogin(username, password);
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles);
// });

for(let data of dataSet){
test(`@Web Client App login ${data.productName}`, async ({ page }) => {
   const pManager = new POManager(page);

   const loginP = pManager.getLoginPage();
   const dPage = pManager.getDashboardPage();
   const cPage = pManager.getCartPage();
   const orPage = pManager.getOrdersReviewPage();
   const ohPage = pManager.getOrdersHistoryPage()

   await loginP.goTo("https://rahulshettyacademy.com/client");
   await loginP.validLogin(data.username, data.password);
   await page.waitForTimeout(3000);
   await dPage.searchProductAddCart(data.productName);
   await dPage.navigateToCart();
   await cPage.VerifyProductIsDisplayed(data.productName);
   await cPage.Checkout();

   await orPage.searchCountryAndSelect("ind", "India");
   const orderId = await orPage.SubmitAndGetOrderId();
   console.log(orderId);

   await dPage.navigateToOrders();
   await ohPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ohPage.getOrderId())).toBeTruthy();

   // expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   // await page.pause();
   // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   // console.log(orderId);
   // await page.locator("button[routerlink*='myorders']").click();
   // await page.locator("tbody").waitFor();

   // const rows = await page.locator("tbody tr");
   // for (let i = 0; i < await rows.count(); i++) {
   //    const text = await rows.nth(i).locator("th").textContent();
   //    if (orderId.includes(text)) {
   //       await rows.nth(i).locator("button").first().click();
   //       break;
   //    }
   // }
   // const orderIdDetails = await page.locator(".col-text").textContent();
   // expect(orderId.includes(orderIdDetails)).toBeTruthy();

})
};
customtest(`Client App login`, async ({ page, testDataForOrder }) => {
   const pManager = new POManager(page);

   const loginP = pManager.getLoginPage();
   const dPage = pManager.getDashboardPage();
   const cPage = pManager.getCartPage();

   await loginP.goTo("https://rahulshettyacademy.com/client");
   await loginP.validLogin(testDataForOrder.username, testDataForOrder.password);
   await page.waitForTimeout(3000);
   await dPage.searchProductAddCart(testDataForOrder.productName);
   await dPage.navigateToCart();
   await cPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cPage.Checkout();
});