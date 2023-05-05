const { test, expect } = require("@playwright/test");

// test.describe.configure({mode: 'parallel'});
test.describe.configure({mode: 'serial'});
test("@Web Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //     await page.goto("http://google.com");
    //  await page.goBack();
    //  await page.goForward();
    const iframeHandle = await page.waitForSelector('iframe');
    const iframe = await iframeHandle.contentFrame();
    console.log(iframe.url());

    // iframe.on('frameattached', (frame) => {
    //     console.log(`Frame attached in iframe: ${frame.url()}`);
    //   });

    //   // Wait for the 'frameattached' event to occur on the iframe
    //   await iframe.waitForLoadState();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    // await page.pause();
    await page.locator("#mousehover").hover();

    await iframe.waitForLoadState();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test("Screenshot and Visual comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' })
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("visual", async ({ page }) => {
    await page.goto("https://google.com/");
    await page.locator("//button[.='AGREE']").click();
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

});