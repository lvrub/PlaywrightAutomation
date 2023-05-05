import { test, request } from "@playwright/test";
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: "anshika101@gmail.com", userPassword: "A11111111a" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };


let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);

})

test('Place the order', async ({ page }) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(3000);
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=643f0913568c3e9fb1560bdf",
        route => route.continue({ url: "https://rahulshettyacademy.com/client/dashboard/order-details/643dc844568c3e9fb154d3dc" })
    );

    await page.locator("button:has-text('View')").first().click();
    await page.pause();

});
