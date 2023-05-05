const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "anshika100@gmail.com",
            password: "A11111111a",
            productName: "zara coat 3"
        }
    }
)
