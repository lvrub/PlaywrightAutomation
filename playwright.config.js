import {defineConfig, devices, firefox  } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 30 * 1000,
  workers:3,
  expect:{
    timeout: 5000
  },
  reporter:  "html"
    // [
    //   "allure-playwright",
    //   {
    //     detail: true,
    //     outputFolder: "my-allure-results",
    //     suiteTitle: false,
    //   },
    // ],
  ,  
  retries: 0,
  use:{
       browserName: "chromium",
   headless: true,
   screenshot: 'on',
   trace: 'on',
  }

  
})
  