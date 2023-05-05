import { test, request } from "@playwright/test";
const { APIUtils } = require('../utils/APIUtils');
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const loginPayLoad = { userEmail: "anshika100@gmail.com", userPassword: "A11111111a" };
const fakePayLoadOrders = { data: [], message: "No Orders" };
// const fakePayLoadOrders = { message: "No Product in Cart"};


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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64371ff2568c3e9fb14fa467",
    // await page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/64371ff2568c3e9fb14fa467",

        async route=> 
        {
            //INTERCEPTING RESPONSE - API response ->(playwright fake response) ->browser-> render data on FE
            const response = await page.request.fetch( route.request());
            let body = fakePayLoadOrders;
            route.fulfill(
                {
                    response,
                    body,

                });
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForTimeout(10000);
    console.log(await page.locator('.mt-4').textContent());
});
