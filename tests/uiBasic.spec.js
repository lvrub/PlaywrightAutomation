const { test, expect, request } = require('@playwright/test');

test('Browser Context Playwright test', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   //page.route('**/*.{jpg, png, jpeg}', route=> route.abort());
   const userName = page.locator('#username');
   const sighIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a");
   page.on("request", request=> console.log(request.url()));
   page.on("response", response => console.log(response.url(), response.status()));

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());

   await userName.type("rahulshetty");
   await page.locator('#password').type("learning");
   await sighIn.click();
   // wait untill untill the locator will be presented
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect')
   //type - fill
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   //race condition
   await Promise.all(
      [
         page.waitForNavigation(),
         sighIn.click()
      ]
   )

   // console.log (await cardTitles.first().textContent());
   // console.log (await cardTitles.nth(0).textContent());
   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);
});

test('Page Playwright test', async ({ page }) => {

   await page.goto("https://www.google.com");
   // get title
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});

test('@Web UI controls', async ({ page }) => {

   const userName = page.locator('#username');
   const sighIn = page.locator('#signInBtn');
   const dropdown = page.locator("select.form-control");
   const radiobutton = page.locator(".radiotextsty");
   const documentLink = page.locator("[href*='documents-request']");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await dropdown.selectOption("consult");
   await radiobutton.last().click();
   await page.locator("#okayBtn").click();
   console.log(await (radiobutton.last().isChecked()));
   await expect(radiobutton.last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   // await userName.type("rahulshetty");
   // await page.locator('#password').type("learning");
   // await sighIn.click();

});

test('Child  windows handle', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      documentLink.click()
   ]);
   const text = await newPage.locator(".red").textContent();
   const arrayText = text.split('@');
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await userName.type(domain);
   await page.pause();
}

)