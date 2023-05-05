
const { test, expect } = require('@playwright/test');

test('Browser Context-Validating Error login', async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").type("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
});


test('Client App login', async ({ page }) => {

   const products = page.locator(".card-body")
   const productName = "Zara Coat 3";
const email = "anshika@gmail.com";

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.waitForTimeout(3000);
   const titles = await page.locator('.card-body b').allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; i++) {
      if (await products.nth(i).locator("b").textContent() === productName);
      {
         await products.nth(i).locator("text = Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
   await page.locator("[routerlink*='cart']").click();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optCount = await dropdown.locator("button").count();
   for (let i=0; i < optCount; i++) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   await expect( page.locator(".user__name [type='text']").nth(0)).toHaveText(email);
   await page.locator(".action__submit").click();
   expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   await page.pause();
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();

   const rows = await page.locator("tbody tr");
   for (let i=0; i < await rows.count(); i++) {
      const text = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(text)) 
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});