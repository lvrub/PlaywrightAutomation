import { test, request, expect } from "@playwright/test";
const {APIUtils} = require('../utils/APIUtils');
const orderPayload = {orders:[{country:"Cuba", productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const loginPayLoad = {userEmail:"anshika100@gmail.com", userPassword:"A11111111a" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response  = await apiUtils.createOrder(orderPayload);
   
})

test('@API Place the order', async ({ page }) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

   //  const products = page.locator(".card-body");
   //  const productName = "Zara Coat 3";
   //  const email = "anshika100@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(3000);
   //  const titles = await page.locator('.card-body b').allTextContents();
   //  console.log(titles);
   //  const count = await products.count();
   //  for (let i = 0; i < count; i++) {
   //     if (await products.nth(i).locator("b").textContent() === productName);
   //     {
   //        await products.nth(i).locator("text = Add To Cart").click();
   //        break;
   //     }
   //  }
   //  await page.locator("[routerlink*='cart']").click();
   //  await page.locator("div li").first().waitFor();
   //  const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
   //  await page.locator("[routerlink*='cart']").click();
   //  expect(bool).toBeTruthy();
   //  await page.locator("text=Checkout").click();
   //  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
   //  const dropdown = page.locator(".ta-results");
   //  await dropdown.waitFor();
   //  const optCount = await dropdown.locator("button").count();
   //  for (let i=0; i < optCount; i++) {
   //     const text = await dropdown.locator("button").nth(i).textContent();
   //     if (text === " India") {
   //        await dropdown.locator("button").nth(i).click();
   //        break;
   //     }
   //  }
   //  await expect( page.locator(".user__name [type='text']").nth(0)).toHaveText(email);
   //  await page.locator(".action__submit").click();
   //  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //  await page.pause();
   //  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(response.orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    for (let i=0; i < await rows.count(); i++) {
       const text = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(text)) 
       {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
 });
