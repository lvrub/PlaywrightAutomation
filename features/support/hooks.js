const { Before, After, AfterStep, Status, BeforeStep } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
// can use tags for specific tags in tests
Before( async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pManager = new POManager(this.page);
});

After(function () {
    console.log("I am last to execute");
});

BeforeStep(function() {

})

AfterStep( async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screen1.png'});
    }
});