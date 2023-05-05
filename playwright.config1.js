import { defineConfig, devices, firefox } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  // retries : 1,
  workers: 3,
  expect: {

    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: 'off',
        trace: 'off',
        ...devices['iPhone 11 Pro Max']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        // permissions:['geolocations']
        // ...devices['iPad (gen 7) landscape']
        // viewport:{width:720, height:720}
      }
    }

  ],
  use: {

    browserName: "webkit",
    headless: true,
    screenshot: 'on',
    trace: 'on'
  }


})
