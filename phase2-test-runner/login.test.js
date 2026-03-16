const { Builder, By, until } = require('selenium-webdriver')

describe("SauceDemo Login", () => {

let driver

beforeAll(async () => {

driver = await new Builder().forBrowser("chrome").build()
})

test("Saucelabs Login Success", async() => {

await driver.get("https://www.saucedemo.com")

await driver.findElement(By.id("user-name")).sendKeys("standard_user")

await driver.findElement(By.id("password")).sendKeys("secret_sauce")

await driver.findElement(By.id("login-button")).click()

let url = await driver.getCurrentUrl()
console.assert(url.includes("inventory"))

})
afterAll(async() => {

await driver.quit()

})

})